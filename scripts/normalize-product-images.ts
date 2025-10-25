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

    const cleanedSegments = segments.filter(
      (segment) => segment.toLowerCase() !== 'yemek resimleri'
    );

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
    console.error('⚠️ Could not normalize URL:', urlString, error);
    return null;
  }
}

async function normalizeProductImages() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable not found.');
  }

  const sql = neon(process.env.POSTGRES_URL);
  const rows = await sql`
    SELECT id, name, image
    FROM products
    WHERE image IS NOT NULL AND image LIKE 'https://raw.githubusercontent.com/hakkurgithub/images/%'
  `;

  const productRows = rows as ProductRow[];

  console.log(`🔍 Checking ${rows.length} product images for normalization...`);

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
    console.log(`✅ Updated image for #${row.id} ${row.name}`);
    console.log(`   ${row.image} -> ${normalized}`);
  }

  if (updatedCount === 0) {
    console.log('ℹ️ All product image URLs are already normalized.');
  } else {
    console.log(`
🎉 Normalized ${updatedCount} product image URL(s).`);
  }
}

normalizeProductImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed to normalize product images:', error);
    process.exit(1);
  });
