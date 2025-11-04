import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

type ProductRow = {
  id: number;
  name: string;
  image: string | null;
};

function normalizeImageUrl(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const segments = url.pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => decodeURIComponent(segment));

    if (segments.length === 0) {
      return null;
    }

    // === DİL MANTIĞI GÜNCELLEMESİ (Türkçe "yemek resimleri" filtresi kaldırıldı) ===
    const cleanedSegments = segments; // Artık özel bir filtreleme yok

    if (cleanedSegments.length === 0) {
      return null;
    }

    const fileName = cleanedSegments.pop();
    if (!fileName) {
      return null;
    }

    const basePath = cleanedSegments.map((segment) => encodeURIComponent(segment)).join('/');
    const normalizedFileName = encodeURIComponent(fileName);
    const normalizedPath = basePath ? `/${basePath}` : '';

    return `${url.origin}${normalizedPath}/${normalizedFileName}`;
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error('⚠️ Nem sikerült normalizálni az URL-t:', urlString, error);
    return null;
  }
}

async function normalizeProductImages() {
  if (!process.env.POSTGRES_URL) {
    // === DİL GÜNCELLEMESİ ===
    throw new Error('A POSTGRES_URL környezeti változó nem található.');
  }

  const sql = neon(process.env.POSTGRES_URL);
  const rows = await sql`
    SELECT id, name, image
    FROM products
    WHERE image IS NOT NULL AND image LIKE 'https://raw.githubusercontent.com/hakkurgithub/images/%'
  `;

  const productRows = rows as ProductRow[];

  // === DİL GÜNCELLEMESİ ===
  console.log(`🔍 ${rows.length} db termékkép ellenőrzése normalizálásra...`);

  let updatedCount = 0;

  for (const row of productRows) {
    if (!row.image) {
      continue;
    }

    const normalized = normalizeImageUrl(row.image);
    if (!normalized || normalized === row.image) {
      continue;
    }

    await sql`
      UPDATE products
      SET image = ${normalized}
      WHERE id = ${row.id}
    `;

    updatedCount++;
    // === DİL GÜNCELLEMESİ ===
    console.log(`✅ Kép frissítve: #${row.id} ${row.name}`);
    console.log(`   ${row.image} -> ${normalized}`);
  }

  if (updatedCount === 0) {
    // === DİL GÜNCELLEMESİ ===
    console.log('ℹ️ Minden termékkép URL már normalizálva van.');
  } else {
    // === DİL GÜNCELLEMESİ ===
    console.log(`
🎉 ${updatedCount} db termékkép URL normalizálva.`);
  }
}

normalizeProductImages()
  .then(() => process.exit(0))
  .catch((error) => {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba a termékképek normalizálása során:', error);
    process.exit(1);
  });