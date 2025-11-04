// scripts/update-admin.ts
import { Client } from 'pg'
import * as dotenv from 'dotenv'

// .env.local fájl betöltése
dotenv.config({ path: '.env.local' })

async function updateAdmin() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL
  })
  
  try {
    await client.connect()
    // === DİL GÜNCELLEMESİ ===
    console.log('🔗 Csatlakozva a Neon adatbázishoz')
    
    // Összes felhasználó listázása
    // === DİL GÜNCELLEMESİ ===
    console.log('\n📋 Jelenlegi felhasználók:')
    const allUsersResult = await client.query('SELECT * FROM users ORDER BY created_at')
    allUsersResult.rows.forEach((user: any) => {
      console.log(`- ${user.name} (${user.email}) - Szerepkör: ${user.role}`)
    })
    
    // kurt.hakki@gmail.com felhasználó keresése
    const userResult = await client.query(
      'SELECT * FROM users WHERE email = $1', 
      ['kurt.hakki@gmail.com']
    )
    
    if (userResult.rows.length === 0) {
      // === DİL GÜNCELLEMESİ ===
      console.log('\n⚠️  Felhasználó nem található. Létrehozás...')
      
      const insertResult = await client.query(`
        INSERT INTO users (name, email, role, created_at) 
        VALUES ($1, $2, $3, NOW()) 
        RETURNING *
      `, ['Hakkı Kurt', 'kurt.hakki@gmail.com', 'manager'])
      
      // === DİL GÜNCELLEMESİ ===
      console.log('✅ Admin felhasználó létrehozva:', insertResult.rows[0])
    } else {
      const user = userResult.rows[0]
      // === DİL GÜNCELLEMESİ ===
      console.log(`\n✅ Felhasználó megtalálva: ${user.name} (${user.role})`)
      
      if (user.role !== 'manager') {
        // === DİL GÜNCELLEMESİ ===
        console.log('🔧 Felhasználói szerepkör frissítése "manager"-re...')
        
        await client.query(
          'UPDATE users SET role = $1 WHERE email = $2',
          ['manager', 'kurt.hakki@gmail.com']
        )
        
        // === DİL GÜNCELLEMESİ ===
        console.log('✅ Felhasználói szerepkör sikeresen "manager"-re frissítve!')
      } else {
        // === DİL GÜNCELLEMESİ ===
        console.log('✅ A felhasználó már "manager" szerepkörrel rendelkezik!')
      }
    }
    
    // === DİL GÜNCELLEMESİ ===
    console.log('\n🎉 Admin frissítési folyamat befejeződött!')
    console.log('\n📝 Most a teendőid:')
    console.log('1. Menj a https://karagozdoner.vercel.app/api/auth/signin címre')
    console.log('2. Jelentkezz be a kurt.hakki@gmail.com címmel')
    console.log('3. Most már szerkesztheted a termékeket a Kezelőpanelen!')
    
  } catch (error) {
    // === DİL GÜNCELLEMESİ ===
    console.error('❌ Hiba:', error)
    throw error
  } finally {
    await client.end()
  }
}

// Script futtatása
if (require.main === module) {
  updateAdmin()
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

export { updateAdmin }