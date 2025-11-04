// scripts/check-admin.ts
import { db } from '../db/drizzle'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

async function checkAndUpdateAdmin() {
  try {
    // === DİL GÜNCELLEMESİ ===
    console.log('🔍 Admin felhasználók ellenőrzése...')
    
    // Összes felhasználó listázása
    const allUsers = await db.select().from(users)
    // === DİL GÜNCELLEMESİ ===
    console.log('\n📋 Jelenlegi felhasználók:')
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Szerepkör: ${user.role}`)
    })
    
    // Admin felhasználó keresése
    const adminUser = await db.select()
      .from(users)
      .where(eq(users.email, 'kurt.hakki@gmail.com'))
      .limit(1)
    
    if (adminUser.length === 0) {
      // === DİL GÜNCELLEMESİ ===
      console.log('\n⚠️  Admin felhasználó nem található. Létrehozás...')
      
      const newAdmin = await db.insert(users).values({
        name: 'Hakkı Kurt',
        email: 'kurt.hakki@gmail.com', 
        role: 'manager'
      }).returning()
      
      // === DİL GÜNCELLEMESİ ===
      console.log('✅ Admin felhasználó létrehozva:', newAdmin[0])
    } else {
      // === DİL GÜNCELLEMESİ ===
      console.log(`\n✅ Admin felhasználó megtalálva: ${adminUser[0].name} (${adminUser[0].role})`)
      
      if (adminUser[0].role !== 'manager') {
        // === DİL GÜNCELLEMESİ ===
        console.log('🔧 Admin szerepkör frissítése...')
        
        await db.update(users)
          .set({ role: 'manager' })
          .where(eq(users.email, 'kurt.hakki@gmail.com'))
        
        // === DİL GÜNCELLEMESİ ===
        console.log('✅ Admin szerepkör "manager"-re frissítve!')
      }
    }
    
    // === DİL GÜNCELLEMESİ ===
    console.log('\n🎉 Admin ellenőrzés befejeződött!')
    
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba:', error)
    throw error
  }
}

// Script futtatása
if (require.main === module) {
  checkAndUpdateAdmin()
    .then(() => {
      // === DİL GÜNCELLEMESİ ===
      console.log('A művelet befejeződött')
      process.exit(0)
    })
    .catch((error) => {
      // === DİL GÜNCELLEMESİ ===
      console.error('A művelet sikertelen:', error)
      process.exit(1)
    })
}

export { checkAndUpdateAdmin }
