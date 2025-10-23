import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL bulunamadı!');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);

async function migratePriceColumn() {
  console.log('🔄 Price kolonunu INTEGER -> NUMERIC(10,2) tipine çeviriyorum...\n');
  
  try {
    // Price kolonunu numeric tipine çevir
    await sql`
      ALTER TABLE products 
      ALTER COLUMN price TYPE NUMERIC(10,2) 
      USING price::numeric(10,2)
    `;
    
    console.log('✅ Price kolonu başarıyla NUMERIC(10,2) tipine çevrildi!');
    console.log('💡 Artık 450.00₺ gibi TL değerleri direkt kaydedebilirsiniz\n');
    
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

migratePriceColumn()
  .then(() => {
    console.log('✅ Migration tamamlandı!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Beklenmeyen hata:', error);
    process.exit(1);
  });
