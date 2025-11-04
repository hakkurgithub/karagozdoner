import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

type Nullable<T> = T | null;

async function updateProductImage() {
  if (!process.env.POSTGRES_URL) {
    // === DİL GÜNCELLEMESİ ===
    throw new Error('A POSTGRES_URL környezeti változó nem található');
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
    /* === İSİM GÜNCELLEMESİ (Türkçe -> Macarca) === */
    WHERE name = 'Csirke Saslik Dürüm'
    RETURNING id, name, image
  `;

  if (result.length === 0) {
    // === DİL GÜNCELLEMESİ ===
    console.log('ℹ️ Nem frissült egyetlen sor sem. Ellenőrizze, hogy a termék neve létezik-e az adatbázisban.');
  } else {
    // === DİL GÜNCELLEMESİ ===
    console.log('✅ A termék képe frissítve:');
    result.forEach((row) => {
      console.log(`  #${row.id} ${row.name} -> ${row.image}`);
    });
  }
}

updateProductImage()
  .then(() => process.exit(0))
  .catch((error) => {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba a termékkép frissítése során:', error);
    process.exit(1);
  });