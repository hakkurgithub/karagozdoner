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
    // === DİL GÜNCELLEMESİ ===
    console.log('🔗 Adatbázis-kapcsolat sikeres\n')
    
    // Tüm ürünleri listele
    const result = await client.query('SELECT * FROM products ORDER BY id')
    
    // === DİL GÜNCELLEMESİ ===
    console.log(`📦 Összesen ${result.rows.length} termék található:\n`)
    
    result.rows.forEach((product: any) => {
      console.log(`ID: ${product.id}`)
      // === DİL GÜNCELLEMESİ ===
      console.log(`  Név: ${product.name}`)
      // === FİYAT MANTIĞI VE DİL GÜNCELLEMESİ (Ft, Tam Sayı) ===
      console.log(`  Ár: ${product.price} Ft`) 
      console.log(`  Kategória: ${product.category}`)
      console.log(`  Kép: ${product.image}`)
      console.log(`  Aktív: ${product.is_active ? 'Igen' : 'Nem'}`)
      console.log('---')
    })
    
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba:', error)
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
