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
  
  console.log('\n🍖 DÖNER ÜRÜNLERİ:\n');
  result.forEach(row => {
    console.log(`${row.name}: ${row.price}₺`);
  });
}

checkPrices().then(() => process.exit(0));
