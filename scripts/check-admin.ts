// scripts/check-admin.ts
import { db } from '../db/drizzle'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

async function checkAndUpdateAdmin() {
  try {
    console.log('🔍 Admin kullanıcıları kontrol ediliyor...')
    
    // Tüm kullanıcıları listele
    const allUsers = await db.select().from(users)
    console.log('\n📋 Mevcut kullanıcılar:')
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`)
    })
    
    // Admin kullanıcısını ara
    const adminUser = await db.select()
      .from(users)
      .where(eq(users.email, 'kurt.hakki@gmail.com'))
      .limit(1)
    
    if (adminUser.length === 0) {
      console.log('\n⚠️  Admin kullanıcısı bulunamadı. Oluşturuluyor...')
      
      const newAdmin = await db.insert(users).values({
        name: 'Hakkı Kurt',
        email: 'kurt.hakki@gmail.com', 
        role: 'manager'
      }).returning()
      
      console.log('✅ Admin kullanıcısı oluşturuldu:', newAdmin[0])
    } else {
      console.log(`\n✅ Admin kullanıcısı bulundu: ${adminUser[0].name} (${adminUser[0].role})`)
      
      if (adminUser[0].role !== 'manager') {
        console.log('🔧 Admin rolü güncelleniyor...')
        
        await db.update(users)
          .set({ role: 'manager' })
          .where(eq(users.email, 'kurt.hakki@gmail.com'))
        
        console.log('✅ Admin rolü "manager" olarak güncellendi!')
      }
    }
    
    console.log('\n🎉 Admin kontrolü tamamlandı!')
    
  } catch (error) {
    console.error('❌ Hata:', error)
    throw error
  }
}

// Script'i çalıştır
if (require.main === module) {
  checkAndUpdateAdmin()
    .then(() => {
      console.log('İşlem tamamlandı')
      process.exit(0)
    })
    .catch((error) => {
      console.error('İşlem başarısız:', error)
      process.exit(1)
    })
}

export { checkAndUpdateAdmin }