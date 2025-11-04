import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

async function removeDuplicateProducts() {
  if (!process.env.POSTGRES_URL) {
    // === DİL GÜNCELLEMESİ ===
    throw new Error('A POSTGRES_URL környezeti változó nem található.');
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
    // === DİL GÜNCELLEMESİ ===
    console.log('✅ Nem találhatóak dupla terméknevek.');
    return;
  }

  // === DİL GÜNCELLEMESİ ===
  console.log('⚠️ Dupla terméknevek észlelve:');
  duplicateRows.forEach((dup) => {
    console.log(`  • ${dup.name} (darab: ${dup.count}) -> ID-k: [${dup.ids.join(', ')}]`);
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
    // === DİL GÜNCELLEMESİ ===
    console.log('ℹ️ Nem történt törlés.');
  } else {
    // === DİL GÜNCELLEMESİ ===
    console.log('\n🗑️ Törölt dupla sorok:');
    deletedRows.forEach((row) => {
      console.log(`  • #${row.id} ${row.name}`);
    });
  }

  // === DİL GÜNCELLEMESİ ===
  console.log('\n✅ A duplikátumok eltávolítása befejeződött.');
}

removeDuplicateProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba a duplikátumok eltávolítása során:', error);
    process.exit(1);
  });