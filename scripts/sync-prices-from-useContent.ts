import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';
import { MENU_ITEMS } from '../lib/menuData';

// .env.local dosyasını yükle
dotenv.config({ path: '.env.local' });

const priceUpdates = MENU_ITEMS.map((item) => ({
  name: item.name,
  price: Number(item.price),
  image: item.image,
}));

function normalizeName(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '');
}

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL environment variable bulunamadı!');
  console.log('💡 .env.local dosyasını kontrol edin.');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);
const db = drizzle(sql);

async function syncPricesFromUseContent() {
  console.log('🔄 useContent.ts fiyatlarını database\'e senkronize ediliyor...\n');

  let updated = 0;
  let notFound = 0;

  const allProducts = await db.select().from(products);
  const productMap = new Map<string, typeof allProducts[number]>();

  for (const product of allProducts) {
    const key = normalizeName(product.name);
    if (!productMap.has(key)) {
      productMap.set(key, product);
    }
  }

  for (const item of priceUpdates) {
    try {
      const normalized = normalizeName(item.name);
      let matchingProduct = productMap.get(normalized);

      if (!matchingProduct) {
        matchingProduct = allProducts.find((product) => {
          const productName = normalizeName(product.name);
          return productName.includes(normalized) || normalized.includes(productName);
        });
      }

      if (matchingProduct) {
        await db
          .update(products)
          .set({
            name: item.name,
            price: item.price.toString(),
            image: item.image,
          })
          .where(eq(products.id, matchingProduct.id));

        console.log(`✅ ${matchingProduct.name} → ${item.price}₺ (ID: ${matchingProduct.id})`);
        updated++;
      } else {
        console.log(`⚠️  "${item.name}" database'de bulunamadı`);
        notFound++;
      }
    } catch (error) {
      console.error(`❌ ${item.name} güncellenirken hata:`, error);
    }
  }

  console.log(`\n📊 Özet:`);
  console.log(`   ✅ Güncellenen: ${updated}`);
  console.log(`   ⚠️  Bulunamayan: ${notFound}`);
  console.log(`   📦 Toplam: ${priceUpdates.length}`);
}

syncPricesFromUseContent()
  .then(() => {
    console.log('\n✅ Senkronizasyon tamamlandı!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  });
