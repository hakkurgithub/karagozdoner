import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

// .env.local dosyasını yükle
dotenv.config({ path: '.env.local' });

// useContent.ts'deki menü verileri - FİYATLAR DİREKT TL CİNSİNDEN (450 = 450₺)
const priceUpdates = [
  // Kebaplar & Izgaralar
  { name: "Adana Kebap", price: 450.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Adanaporsiyon.jpg" },
  { name: "Urfa Kebap", price: 450.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Adanaporsiyon.jpg" },
  { name: "Beyti", price: 600.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Beyti%20Sarma.jpg" },
  { name: "İskender Kebap", price: 500.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender%20Kebap.jpeg" },
  { name: "Et Şiş", price: 650.00, image: "https://readdy.ai/api/search-image?query=Turkish%20shish%20kebab%20grilled%20meat%20cubes%20on%20skewers%20with%20rice%20and%20vegetables%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=sis1&orientation=landscape" },
  { name: "Tavuk Şiş", price: 400.00, image: "https://readdy.ai/api/search-image?query=Turkish%20chicken%20shish%20kebab%20grilled%20marinated%20chicken%20pieces%20on%20skewers%20with%20rice%20pilaf%20and%20salad%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=tavuksis1&orientation=landscape" },
  { name: "Kuzu Pirzola", price: 750.00, image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20lamb%20chops%20with%20herbs%20and%20vegetables%20on%20white%20plate%20elegant%20presentation%20professional%20food%20photography&width=400&height=300&seq=pirzola1&orientation=landscape" },
  { name: "Köfte", price: 350.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara%20k%C3%B6fte.jpeg" },
  { name: "Karışık Izgara", price: 800.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-izgara.jpg" },
  { name: "Tavuk Kanadı", price: 300.00, image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20chicken%20wings%20marinated%20with%20spices%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=kanat1&orientation=landscape" },
  { name: "Çöp Şiş", price: 550.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis.jpg" },
  { name: "Antrikot", price: 900.00, image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20beef%20steak%20antrikot%20with%20vegetables%20and%20sauce%20on%20white%20plate%20premium%20presentation%20professional%20food%20photography&width=400&height=300&seq=antrikot1&orientation=landscape" },

  // Pide & Lahmacun
  { name: "Lahmacun", price: 130.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Lahmacun.jpg" },
  { name: "Kuşbaşılı Pide", price: 450.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Kusbasili-Pide.jpeg" },
  { name: "Kaşarlı Pide", price: 400.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Kasarlı Pide.jpg" },
  { name: "Karışık Pide", price: 400.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisikpide.jpeg" },
  { name: "Sucuklu Pide", price: 380.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sucuklu-kasarli-pide.jpg" },
  { name: "Yumurtalı Pide", price: 350.00, image: "https://readdy.ai/api/search-image?query=Turkish%20pide%20bread%20with%20egg%20and%20cheese%20boat%20shaped%20golden%20brown%20crust%20breakfast%20style%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=yumurtali1&orientation=landscape" },
  { name: "Kıymalı Pide", price: 420.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Kıymalı Pide.jpg" },
  { name: "Açık Ayran", price: 25.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/acık ayran.jpg" },

  // Döner
  { name: "Porsiyon Et Döner", price: 500.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Porsiyon et döner.jpg" },
  { name: "Pilav Üstü Döner", price: 450.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav ustu et doner.jpg" },
  { name: "Dürüm Döner", price: 300.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Durum doner.png" },
  { name: "Tavuk Döner", price: 400.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Tavuk Doner.jpg" },
  { name: "Ekmek Arası Döner", price: 250.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/ekmek arasi doner.jpg" },
  { name: "Çifte Döner", price: 550.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/cifte doner.png" },

  // Dürüm
  { name: "Adana Dürüm", price: 250.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana durum.jpg" },
  { name: "Urfa Dürüm", price: 250.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana durum.jpg" },
  { name: "Tavuk Şiş Dürüm", price: 250.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Tavuk sis durum.png" },
  { name: "Köfte Dürüm", price: 220.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kofte-durum.jpg" },
  { name: "Et Şiş Dürüm", price: 350.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Et sis Durum.png" },
  { name: "Kanat Dürüm", price: 200.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Tavuk Kanat Durum.png" },

  // Çorbalar
  { name: "Mercimek Çorbası", price: 40.00, image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek corbasi.jpg" },
  { name: "Ezogelin Çorbası", price: 45.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20Ezogelin%20soup%20with%20bulgur%20and%20lentils%20in%20white%20bowl%20garnished%20with%20herbs%20on%20white%20background&width=400&height=300&seq=ezogelin1&orientation=landscape" },
  { name: "Yayla Çorbası", price: 50.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20yayla%20soup%20with%20yogurt%20and%20chickpeas%20in%20white%20bowl%20with%20mint%20garnish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=yayla1&orientation=landscape" },
  { name: "Tavuk Suyu Çorbası", price: 35.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20chicken%20soup%20clear%20broth%20with%20vegetables%20in%20white%20bowl%20homemade%20style%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=tavuksuyu1&orientation=landscape" },

  // Yan Ürünler
  { name: "Bulgur Pilavı", price: 35.00, image: "https://readdy.ai/api/search-image?query=Turkish%20bulgur%20pilaf%20with%20butter%20in%20white%20bowl%20garnished%20with%20herbs%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=bulgur1&orientation=landscape" },
  { name: "Mevsim Salata", price: 50.00, image: "https://readdy.ai/api/search-image?query=Fresh%20Turkish%20seasonal%20salad%20with%20mixed%20vegetables%20tomatoes%20cucumbers%20onions%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=salata1&orientation=landscape" },
  { name: "Közlenmiş Sebze", price: 60.00, image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20roasted%20vegetables%20mixed%20peppers%20tomatoes%20eggplant%20on%20white%20plate%20healthy%20side%20dish%20professional%20food%20photography&width=400&height=300&seq=sebze1&orientation=landscape" },
  { name: "Cacık", price: 30.00, image: "https://readdy.ai/api/search-image?query=Turkish%20cacik%20yogurt%20cucumber%20mint%20dip%20in%20white%20bowl%20traditional%20side%20dish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=cacik1&orientation=landscape" },
  { name: "Pilav", price: 30.00, image: "https://readdy.ai/api/search-image?query=Turkish%20rice%20pilaf%20with%20butter%20in%20white%20bowl%20fluffy%20texture%20traditional%20side%20dish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=pilav1&orientation=landscape" },
  { name: "Turşu", price: 25.00, image: "https://readdy.ai/api/search-image?query=Turkish%20homemade%20mixed%20pickles%20vegetables%20in%20white%20bowl%20traditional%20fermented%20vegetables%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=tursu1&orientation=landscape" },

  // Tatlılar
  { name: "Baklava", price: 80.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20baklava%20pastry%20with%20pistachios%20and%20honey%20syrup%20golden%20layers%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=baklava1&orientation=landscape" },
  { name: "Künefe", price: 90.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20kunefe%20dessert%20with%20cheese%20and%20shredded%20phyllo%20pastry%20golden%20brown%20on%20white%20plate%20with%20syrup&width=400&height=300&seq=kunefe1&orientation=landscape" },
  { name: "Sütlaç", price: 60.00, image: "https://readdy.ai/api/search-image?query=Turkish%20rice%20pudding%20sutlac%20in%20white%20bowl%20with%20cinnamon%20traditional%20dessert%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=sutlac1&orientation=landscape" },
  { name: "Muhallebi", price: 50.00, image: "https://readdy.ai/api/search-image?query=Turkish%20muhallebi%20milk%20pudding%20with%20cinnamon%20in%20white%20bowl%20traditional%20dessert%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=muhallebi1&orientation=landscape" },

  // İçecekler
  { name: "Ayran", price: 20.00, image: "https://readdy.ai/api/search-image?query=Fresh%20Turkish%20ayran%20yogurt%20drink%20in%20tall%20glass%20with%20foam%20on%20top%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=ayran1&orientation=landscape" },
  { name: "Çay", price: 15.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20tea%20in%20tulip%20glass%20with%20saucer%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=cay1&orientation=landscape" },
  { name: "Türk Kahvesi", price: 30.00, image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20coffee%20in%20small%20cup%20with%20foam%20and%20Turkish%20delight%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=kahve1&orientation=landscape" },
  { name: "Şalgam", price: 25.00, image: "https://readdy.ai/api/search-image?query=Turkish%20shalgam%20turnip%20juice%20in%20tall%20glass%20traditional%20fermented%20drink%20purple%20color%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=salgam1&orientation=landscape" },
  { name: "Kola", price: 20.00, image: "https://readdy.ai/api/search-image?query=Cold%20cola%20drink%20in%20glass%20with%20ice%20cubes%20refreshing%20beverage%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=kola1&orientation=landscape" },
  { name: "Su", price: 10.00, image: "https://readdy.ai/api/search-image?query=Bottled%20drinking%20water%20clear%20plastic%20bottle%20on%20white%20background%20simple%20clean%20professional%20photography&width=400&height=300&seq=su1&orientation=landscape" },
];

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

  for (const item of priceUpdates) {
    try {
      // Ürünü database'de bul (isim benzerliği ile)
      const allProducts = await db.select().from(products);
      
      // İsim eşleşmesi (kısmi eşleşme)
      const matchingProduct = allProducts.find(p => 
        p.name.toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes(p.name.toLowerCase())
      );

      if (matchingProduct) {
        // Fiyat ve resmi güncelle - FİYATLAR DİREKT TL CİNSİNDEN
        await db.update(products)
          .set({ 
            price: item.price,
            image: item.image 
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
