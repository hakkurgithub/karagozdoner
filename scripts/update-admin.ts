// scripts/update-admin.ts
import { Client } from 'pg'
import * as dotenv from 'dotenv'

// .env.local dosyasını yükle
dotenv.config({ path: '.env.local' })

async function updateAdmin() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL
  })
  
  try {
    await client.connect()
    console.log('🔗 Neon veritabanına bağlandı')
    
    // Tüm kullanıcıları listele
    console.log('\n📋 Mevcut kullanıcılar:')
    const allUsersResult = await client.query('SELECT * FROM users ORDER BY created_at')
    allUsersResult.rows.forEach((user: any) => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`)
    })
    
    // kurt.hakki@gmail.com kullanıcısını ara
    const userResult = await client.query(
      'SELECT * FROM users WHERE email = $1', 
      ['kurt.hakki@gmail.com']
    )
    
    if (userResult.rows.length === 0) {
      console.log('\n⚠️  Kullanıcı bulunamadı. Oluşturuluyor...')
      
      const insertResult = await client.query(`
        INSERT INTO users (name, email, role, created_at) 
        VALUES ($1, $2, $3, NOW()) 
        RETURNING *
      `, ['Hakkı Kurt', 'kurt.hakki@gmail.com', 'manager'])
      
      console.log('✅ Admin kullanıcısı oluşturuldu:', insertResult.rows[0])
    } else {
      const user = userResult.rows[0]
      console.log(`\n✅ Kullanıcı bulundu: ${user.name} (${user.role})`)
      
      if (user.role !== 'manager') {
        console.log('🔧 Kullanıcı rolü manager olarak güncelleniyor...')
        
        await client.query(
          'UPDATE users SET role = $1 WHERE email = $2',
          ['manager', 'kurt.hakki@gmail.com']
        )
        
        console.log('✅ Kullanıcı rolü "manager" olarak güncellendi!')
      } else {
        console.log('✅ Kullanıcı zaten manager rolüne sahip!')
      }
    }
    
    console.log('\n🎉 Admin güncelleme işlemi tamamlandı!')
    console.log('\n📝 Şimdi yapman gerekenler:')
    console.log('1. https://karagozdoner.vercel.app/api/auth/signin adresine git')
    console.log('2. kurt.hakki@gmail.com ile giriş yap')
    console.log('3. Admin panelinden ürünleri düzenleyebilirsin!')
    
  } catch (error) {
    console.error('❌ Hata:', error)
    throw error
  } finally {
    await client.end()
  }
}

// Script'i çalıştır
if (require.main === module) {
  updateAdmin()
    .then(() => {
      console.log('İşlem tamamlandı')
      process.exit(0)
    })
    .catch((error) => {
      console.error('İşlem başarısız:', error)
      process.exit(1)
    })
}

export { updateAdmin }