import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

type Nullable<T> = T | null;

async function updateProductImage() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable not found');
  }

  const sql = neon(process.env.POSTGRES_URL);
  const newImageUrl = 'https://raw.githubusercontent.com/hakkurgithub/images/main/Tavuk%20%C5%9Ei%C5%9F%20d%C3%BCr%C3%BCm.jpg';

  const result = await sql<{
    id: number;
    name: string;
    image: Nullable<string>;
  }[]>`
    UPDATE products
    SET image = ${newImageUrl}
    WHERE name = 'Tavuk Şiş Dürüm (Türkçe İmlalı)'
    RETURNING id, name, image
  `;

  if (result.length === 0) {
    console.log('ℹ️ No rows updated. Check if the product name exists in the database.');
  } else {
    console.log('✅ Product image updated:');
    result.forEach((row) => {
      console.log(`  #${row.id} ${row.name} -> ${row.image}`);
    });
  }
}

updateProductImage()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed to update product image:', error);
    process.exit(1);
  });
