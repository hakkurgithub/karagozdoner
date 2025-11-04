import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL!);

async function checkPrices() {
  const result = await sql`
    SELECT name, price 
    FROM products 
    WHERE name LIKE '%Döner%' 
    ORDER BY name
  `;
  
  // === DİL GÜNCELLEMESİ ===
  console.log('\n🍖 DÖNER TERMÉKEK:\n');
  result.forEach(row => {
    // === FİYAT MANTIĞI VE DİL GÜNCELLEMESİ (Ft, Tam Sayı) ===
    console.log(`${row.name}: ${row.price} Ft`);
  });
}

checkPrices().then(() => process.exit(0));