// scripts/seed.ts
import { db } from '../db/drizzle'
import { products, users } from '../db/schema'

async function seed() {
  console.log('🌱 Veritabanına test verisi ekleniyor...')
  
  try {
    // Test kullanıcıları ekle
    const testUsers = await db.insert(users).values([
      {
        name: 'Admin User',
        email: 'admin@karagozdoner.com',
        role: 'manager'
      },
      {
        name: 'B2B Müşteri',
        email: 'b2b@example.com',
        role: 'b2b'
      }
    ]).returning()
    
    console.log(`✅ ${testUsers.length} kullanıcı eklendi`)
    
    // Test ürünleri ekle
    const testProducts = await db.insert(products).values([
      {
        name: 'Klasik Döner',
        description: 'Geleneksel döner usulü hazırlanmış, taze sebzelerle servis edilen klasik dönerimiz',
        price: 4500, // 45.00 TL (kuruş cinsinden)
        category: 'Döner',
        image: '/images/menu/klasik-doner.jpg'
      },
      {
        name: 'Tavuk Döner',
        description: 'Marine edilmiş tavuk göğsünden hazırlanan sağlıklı döner alternatifi',
        price: 4000, // 40.00 TL
        category: 'Döner',
        image: '/images/menu/tavuk-doner.jpg'
      },
      {
        name: 'Adana Kebap',
        description: 'Acılı kıyma ile hazırlanmış geleneksel Adana kebabı',
        price: 6500, // 65.00 TL
        category: 'Kebap',
        image: '/images/menu/adana-kebap.jpg'
      },
      {
        name: 'Urfa Kebap',
        description: 'Acısız kıyma ile hazırlanmış lezzetli Urfa kebabı',
        price: 6500, // 65.00 TL
        category: 'Kebap',
        image: '/images/menu/urfa-kebap.jpg'
      },
      {
        name: 'Karışık Pide',
        description: 'Kaşar peyniri, sucuk, yumurta ve sebzelerle hazırlanmış nefis pide',
        price: 5500, // 55.00 TL
        category: 'Pide',
        image: '/images/menu/karisik-pide.jpg'
      },
      {
        name: 'Peynirli Pide',
        description: 'Bol kaşar peyniri ile hazırlanmış geleneksel pide',
        price: 4500, // 45.00 TL
        category: 'Pide',
        image: '/images/menu/peynirli-pide.jpg'
      },
      {
        name: 'Ayran',
        description: 'Geleneksel Türk ayranı - serinletici ve sağlıklı',
        price: 800, // 8.00 TL
        category: 'İçecekler',
        image: '/images/menu/ayran.jpg'
      },
      {
        name: 'Çay',
        description: 'Geleneksel Türk çayı',
        price: 500, // 5.00 TL
        category: 'İçecekler',
        image: '/images/menu/cay.jpg'
      },
      {
        name: 'Kola',
        description: 'Soğuk kola - 330ml',
        price: 1000, // 10.00 TL
        category: 'İçecekler',
        image: '/images/menu/kola.jpg'
      },
      {
        name: 'Su',
        description: 'Doğal kaynak suyu - 500ml',
        price: 300, // 3.00 TL
        category: 'İçecekler',
        image: '/images/menu/su.jpg'
      }
    ]).returning()
    
    console.log(`✅ ${testProducts.length} ürün eklendi`)
    
    console.log('🎉 Seed işlemi tamamlandı!')
    
    // Eklenen verilerin özetini göster
    console.log('\n📊 Eklenen Veriler:')
    console.log('Kullanıcılar:', testUsers.map((u: any) => `${u.name} (${u.role})`))
    console.log('Ürünler:', testProducts.map((p: any) => `${p.name} - ${p.price/100}₺`))
    
  } catch (error) {
    console.error('❌ Seed işlemi sırasında hata:', error)
    throw error
  }
}

// Script'i çalıştır
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seed işlemi başarıyla tamamlandı')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed işlemi başarısız:', error)
      process.exit(1)
    })
}

export { seed }