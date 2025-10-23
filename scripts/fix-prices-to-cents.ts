import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

// .env.local dosyasını yükle
dotenv.config({ path: '.env.local' });

// useContent.ts'deki menü verileri - FİYATLAR KURUŞ CİNSİNDEN (1 TL = 100 kuruş)
const correctPrices = [
  // Kebaplar & Izgaralar (450 = 4.50₺)
  { name: "Adana Kebap", price: 45000 }, // 450₺
  { name: "Urfa Kebap", price: 45000 },
  { name: "Beyti", price: 60000 }, // 600₺
  { name: "İskender Kebap", price: 50000 }, // 500₺
  { name: "Et Şiş", price: 65000 }, // 650₺
  { name: "Tavuk Şiş", price: 40000 }, // 400₺
  { name: "Kuzu Pirzola", price: 75000 }, // 750₺
  { name: "Köfte", price: 35000 }, // 350₺
  { name: "Karışık Izgara", price: 80000 }, // 800₺
  { name: "Tavuk Kanadı", price: 30000 }, // 300₺
  { name: "Çöp Şiş", price: 55000 }, // 550₺
  { name: "Antrikot", price: 90000 }, // 900₺

  // Pide & Lahmacun
  { name: "Lahmacun", price: 13000 }, // 130₺
  { name: "Kuşbaşılı Pide", price: 45000 }, // 450₺
  { name: "Kaşarlı Pide", price: 40000 }, // 400₺
  { name: "Karışık Pide", price: 40000 }, // 400₺
  { name: "Sucuklu Pide", price: 38000 }, // 380₺
  { name: "Yumurtalı Pide", price: 35000 }, // 350₺
  { name: "Kıymalı Pide", price: 42000 }, // 420₺
  { name: "Açık Ayran", price: 2500 }, // 25₺

  // Döner
  { name: "Porsiyon Et Döner", price: 50000 }, // 500₺
  { name: "Pilav Üstü Döner", price: 45000 }, // 450₺
  { name: "Dürüm Döner", price: 30000 }, // 300₺
  { name: "Tavuk Döner", price: 40000 }, // 400₺
  { name: "Ekmek Arası Döner", price: 25000 }, // 250₺
  { name: "Çifte Döner", price: 55000 }, // 550₺

  // Dürüm
  { name: "Adana Dürüm", price: 25000 }, // 250₺
  { name: "Urfa Dürüm", price: 25000 }, // 250₺
  { name: "Tavuk Şiş Dürüm", price: 25000 }, // 250₺
  { name: "Köfte Dürüm", price: 22000 }, // 220₺
  { name: "Et Şiş Dürüm", price: 35000 }, // 350₺
  { name: "Kanat Dürüm", price: 20000 }, // 200₺

  // Çorbalar
  { name: "Mercimek Çorbası", price: 4000 }, // 40₺
  { name: "Ezogelin Çorbası", price: 4500 }, // 45₺
  { name: "Yayla Çorbası", price: 5000 }, // 50₺
  { name: "Tavuk Suyu Çorbası", price: 3500 }, // 35₺

  // Yan Ürünler
  { name: "Bulgur Pilavı", price: 3500 }, // 35₺
  { name: "Mevsim Salata", price: 5000 }, // 50₺
  { name: "Közlenmiş Sebze", price: 6000 }, // 60₺
  { name: "Cacık", price: 3000 }, // 30₺
  { name: "Pilav", price: 3000 }, // 30₺
  { name: "Turşu", price: 2500 }, // 25₺

  // Tatlılar
  { name: "Baklava", price: 8000 }, // 80₺
  { name: "Künefe", price: 9000 }, // 90₺
  { name: "Sütlaç", price: 6000 }, // 60₺
  { name: "Muhallebi", price: 5000 }, // 50₺

  // İçecekler
  { name: "Ayran", price: 2000 }, // 20₺
  { name: "Çay", price: 1500 }, // 15₺
  { name: "Türk Kahvesi", price: 3000 }, // 30₺
  { name: "Şalgam", price: 2500 }, // 25₺
  { name: "Kola", price: 2000 }, // 20₺
  { name: "Su", price: 1000 }, // 10₺
];

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL environment variable bulunamadı!');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);
const db = drizzle(sql);

async function fixPricesToCents() {
  console.log('🔧 Fiyatları kuruş cinsine çeviriyorum (1₺ = 100 kuruş)...\n');

  let updated = 0;
  let notFound = 0;

  for (const item of correctPrices) {
    try {
      const allProducts = await db.select().from(products);
      
      // İsim eşleşmesi
      const matchingProduct = allProducts.find(p => 
        p.name.toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes(p.name.toLowerCase())
      );

      if (matchingProduct) {
        await db.update(products)
          .set({ price: item.price })
          .where(eq(products.id, matchingProduct.id));

        console.log(`✅ ${matchingProduct.name} → ${item.price / 100} ₺ (${item.price} kuruş)`);
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
  console.log(`   📦 Toplam: ${correctPrices.length}`);
}

fixPricesToCents()
  .then(() => {
    console.log('\n✅ Fiyatlar kuruş cinsine çevrildi!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  });
