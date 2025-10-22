// scripts/sync-menu-to-db.ts
import * as dotenv from 'dotenv'
import { db } from '../db/drizzle'
import { products } from '../db/schema'
import { MENU_ITEMS } from '../lib/menuData'

// Load environment variables
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

async function syncMenuToDatabase() {
  // Check database connection
  if (!process.env.POSTGRES_URL) {
    console.error('❌ POSTGRES_URL environment variable not found!')
    console.error('💡 Make sure .env.local file exists with POSTGRES_URL')
    process.exit(1)
  }
  
  console.log('✅ Database connection configured')
  
  console.log('🔄 Syncing menu items to database...')
  console.log(`📦 Total items to sync: ${MENU_ITEMS.length}`)
  
  try {
    // Her menü öğesini database'e ekle
    for (const item of MENU_ITEMS) {
      await db.insert(products).values({
        name: item.name,
        description: item.description,
        price: item.price, // Zaten kuruş cinsinden
        category: item.category,
        image: item.image,
        isActive: 1
      }).onConflictDoNothing() // Eğer varsa skip et
      
      console.log(`✅ Added: ${item.name} - ${item.category}`)
    }
    
    console.log('✅ All menu items synced successfully!')
    
    // Toplam ürün sayısını göster
    const allProducts = await db.select().from(products)
    console.log(`📊 Total products in database: ${allProducts.length}`)
    
  } catch (error) {
    console.error('❌ Error syncing menu:', error)
    throw error
  }
}

syncMenuToDatabase()
  .then(() => {
    console.log('✅ Sync completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  })
