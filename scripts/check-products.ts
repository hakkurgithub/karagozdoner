// scripts/check-products.ts
import { Client } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkProducts() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL
  })
  
  try {
    await client.connect()
    console.log('🔗 Database bağlantısı başarılı\n')
    
    // Tüm ürünleri listele
    const result = await client.query('SELECT * FROM products ORDER BY id')
    
    console.log(`📦 Toplam ${result.rows.length} ürün bulundu:\n`)
    
    result.rows.forEach((product: any) => {
      console.log(`ID: ${product.id}`)
      console.log(`  İsim: ${product.name}`)
      console.log(`  Fiyat: ${(product.price / 100).toFixed(2)} ₺`)
      console.log(`  Kategori: ${product.category}`)
      console.log(`  Resim: ${product.image}`)
      console.log(`  Aktif: ${product.is_active ? 'Evet' : 'Hayır'}`)
      console.log('---')
    })
    
  } catch (error) {
    console.error('❌ Hata:', error)
  } finally {
    await client.end()
  }
}

if (require.main === module) {
  checkProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { checkProducts }