// scripts/sync-menu-to-db.ts
import * as dotenv from 'dotenv'
import { db } from '../db/drizzle'
import { products } from '../db/schema'
import { MENU_ITEMS } from '../lib/menuData'

// Környezeti változók betöltése
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

async function syncMenuToDatabase() {
  // Adatbázis-kapcsolat ellenőrzése
  if (!process.env.POSTGRES_URL) {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ A POSTGRES_URL környezeti változó nem található!')
    console.error('💡 Ellenőrizze, hogy létezik-e a .env.local fájl a POSTGRES_URL-lel')
    process.exit(1)
  }
  
  // === DİL GÜNCELLEMESİ ===
  console.log('✅ Az adatbázis-kapcsolat konfigurálva')
  
  console.log('🔄 Menüelemek szinkronizálása az adatbázisba...')
  console.log(`📦 Összesen szinkronizálandó elem: ${MENU_ITEMS.length}`)
  
  try {
    // Minden menüelemet adjon hozzá az adatbázishoz
    for (const item of MENU_ITEMS) {
      await db.insert(products).values({
        name: item.name,
        description: item.description,
        price: item.price, // === YORUM GÜNCELLEMESİ (Artık Ft (tam sayı)) ===
        category: item.category,
        image: item.image,
        isActive: 1
      }).onConflictDoNothing() // Ha már létezik, hagyja ki
      
      // === DİL GÜNCELLEMESİ ===
      console.log(`✅ Hozzáadva: ${item.name} - ${item.category}`)
    }
    
    // === DİL GÜNCELLEMESİ ===
    console.log('✅ Az összes menüelem sikeresen szinkronizálva!')
    
    // Összes termékszám megjelenítése
    const allProducts = await db.select().from(products)
    // === DİL GÜNCELLEMESİ ===
    console.log(`📊 Összes termék az adatbázisban: ${allProducts.length}`)
    
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba a menü szinkronizálása közben:', error)
    throw error
  }
}

syncMenuToDatabase()
  .then(() => {
    // === DİL GÜNCELLEMESİ ===
    console.log('✅ A szinkronizálás befejeződött!')
    process.exit(0)
  })
  .catch((error) => {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ A szinkronizálás sikertelen:', error)
    process.exit(1)
  })
