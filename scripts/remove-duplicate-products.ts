import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

async function removeDuplicateProducts() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable not found.');
  }

  const sql = neon(process.env.POSTGRES_URL);

  const duplicates = await sql`
    SELECT name, ARRAY_AGG(id ORDER BY id) AS ids, COUNT(*)::text AS count
    FROM products
    GROUP BY name
    HAVING COUNT(*) > 1
    ORDER BY name
  `;

  const duplicateRows = duplicates as Array<{ name: string; ids: number[]; count: string }>;

  if (duplicateRows.length === 0) {
    console.log('✅ No duplicate product names found.');
    return;
  }

  console.log('⚠️ Duplicate product names detected:');
  duplicateRows.forEach((dup) => {
    console.log(`  • ${dup.name} (count: ${dup.count}) -> ids: [${dup.ids.join(', ')}]`);
  });

  const deleted = await sql`
    WITH ranked AS (
      SELECT id, name,
             ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS rn
      FROM products
    ),
    duplicates AS (
      SELECT id FROM ranked WHERE rn > 1
    )
    DELETE FROM products
    WHERE id IN (SELECT id FROM duplicates)
    RETURNING id, name
  `;

  const deletedRows = deleted as Array<{ id: number; name: string }>;

  if (deletedRows.length === 0) {
    console.log('ℹ️ Nothing deleted.');
  } else {
    console.log('\n🗑️ Deleted duplicate rows:');
    deletedRows.forEach((row) => {
      console.log(`  • #${row.id} ${row.name}`);
    });
  }

  console.log('\n✅ Duplicate cleanup completed.');
}

removeDuplicateProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed to remove duplicates:', error);
    process.exit(1);
  });
