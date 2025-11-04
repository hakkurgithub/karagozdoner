import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';
import { MENU_ITEMS } from '../lib/menuData'; // <-- Wix menüsü zaten burada

// .env.local fájl betöltése
dotenv.config({ path: '.env.local' });

const priceUpdates = MENU_ITEMS.map((item) => ({
  name: item.name,
  price: Number(item.price), // Már 'number' (Ft)
  image: item.image,
}));

function normalizeName(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD') // Eltávolítja az összes ékezetet (magyart is)
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ''); // Eltávolítja a nem alfanumerikus karaktereket
}

if (!process.env.POSTGRES_URL) {
  // === DİL GÜNCELLEMESİ ===
  console.error('❌ A POSTGRES_URL környezeti változó nem található!');
  console.log('💡 Ellenőrizze a .env.local fájlt.');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);
const db = drizzle(sql);

async function syncPricesFromUseContent() {
  // === DİL GÜNCELLEMESİ ===
  console.log('🔄 Árak szinkronizálása a menuData.ts-ből az adatbázisba...\n');

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
            // === HATA DÜZELTMESİ (toString() kaldırıldı, Ft (number) gönderiliyor) ===
            price: item.price, 
            image: item.image,
          })
          .where(eq(products.id, matchingProduct.id));

        // === DİL VE PARA BİRİMİ GÜNCELLEMESİ ===
        console.log(`✅ ${matchingProduct.name} → ${item.price} Ft (ID: ${matchingProduct.id})`);
        updated++;
      } else {
        // === DİL GÜNCELLEMESİ ===
        console.log(`⚠️  "${item.name}" nem található az adatbázisban`);
        notFound++;
      }
    } catch (error) {
      // === DİL GÜNCELLEMESİ ===
      console.error(`❌ Hiba a(z) ${item.name} frissítése során:`, error);
    }
  }

  // === DİL GÜNCELLEMESİ ===
  console.log(`\n📊 Összegzés:`);
  console.log(`   ✅ Frissítve: ${updated}`);
  console.log(`   ⚠️  Nem található: ${notFound}`);
  console.log(`   📦 Összesen: ${priceUpdates.length}`);
}

syncPricesFromUseContent()
  .then(() => {
    // === DİL GÜNCELLEMESİ ===
    console.log('\n✅ Szinkronizálás befejeződött!');
    process.exit(0);
  })
  .catch((error) => {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba történt:', error);
    process.exit(1);
  });