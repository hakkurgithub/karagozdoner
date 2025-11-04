import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from '../db/schema'

// Bővített környezeti változó validáció diagnosztikai információkkal
function validateDatabaseConfig() {
  const postgresUrl = process.env.POSTGRES_URL;
  
  // === DİL GÜNCELLEMESİ (Teşhis mesajları) ===
  console.log("🔍 ADATBÁZIS KONFIGURÁCIÓS DIAGNOSZTIKA:");
  console.log("   NODE_ENV:", process.env.NODE_ENV);
  console.log("   POSTGRES_URL létezik:", !!postgresUrl);
  console.log("   POSTGRES_URL hossza:", postgresUrl?.length || 0);
  console.log("   POSTGRES_URL előnézet:", postgresUrl?.substring(0, 30) + "..." || "NINCS_BEÁLLÍTVA");
  
  if (!postgresUrl) {
    console.error("❌ A POSTGRES_URL környezeti változó teljesen hiányzik");
    console.error("💡 Hozzon létre egy .env.local fájlt a következő tartalommal: POSTGRES_URL=\"az_ön_vercel_postgres_url-je\"");
    return false;
  }
  
  if (postgresUrl === "Vercel projenizden aldığınız veritabanı bağlantı adresi") {
    console.error("❌ A POSTGRES_URL még mindig egy helykitöltő érték");
    console.error("💡 Cserélje le a valódi Vercel Postgres kapcsolati karakterláncra");
    return false;
  }
  
  if (postgresUrl.includes("test") || postgresUrl.includes("placeholder") || postgresUrl.length < 20) {
    console.error("❌ A POSTGRES_URL érvénytelennek vagy tesztértéknek tűnik");
    console.error("💡 Győződjön meg róla, hogy valódi Vercel Postgres kapcsolati karakterláncot használ");
    return false;
  }
  
  if (!postgresUrl.startsWith("postgres://") && !postgresUrl.startsWith("postgresql://")) {
    console.error("❌ A POSTGRES_URL nem tűnik érvényes PostgreSQL kapcsolati karakterláncnak");
    console.error("💡 'postgres://' vagy 'postgresql://' kezdetűnek kell lennie");
    return false;
  }
  
  console.log("✅ A POSTGRES_URL formátuma érvényesnek tűnik");
  return true;
}

// Adatbázis konfiguráció ellenőrzése a modul betöltésekor
const isDatabaseConfigured = validateDatabaseConfig();

// Vercel Postgres kapcsolat a Drizzle ORM-mel
export const db = drizzle(sql, { schema })

// Adatbázis konfigurációs állapota
export const isDatabaseReady = isDatabaseConfigured;

// Bővített adatbázis-kapcsolati teszt részletes diagnosztikával
export async function testConnection() {
  // === DİL GÜNCELLEMESİ (Test mesajları) ===
  console.log("🔄 Adatbázis-kapcsolat tesztelése...");
  
  if (!isDatabaseReady) {
    console.error("❌ Az adatbázis konfigurációja érvénytelen. A kapcsolati teszt kihagyva.");
    return false;
  }
  
  try {
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`
    console.log('✅ Adatbázis-kapcsolat sikeres!');
    console.log('   Szerveridő:', result.rows[0].current_time);
    console.log('   PostgreSQL verzió:', result.rows[0].pg_version?.substring(0, 50) + "...");
    return true;
  } catch (error) {
    console.error('❌ Adatbázis-kapcsolat sikertelen:');
    console.error('   Hiba típusa:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('   Hibaüzenet:', error instanceof Error ? error.message : String(error));
    console.error('   Hibakód:', (error as any)?.code || 'NINCS_KÓD');
    
    // Specifikus hibajavaslatok (DİL GÜNCELLEMESİ)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('invalid_connection_string')) {
      console.error('💡 MEGOLDÁS: A POSTGRES_URL közvetlen kapcsolathoz való.');
      console.error('   Próbálja meg a POOLED kapcsolati karakterláncot használni a Vercelből.');
    } else if (errorMessage.includes('authentication')) {
      console.error('💡 MEGOLDÁS: Ellenőrizze az adatbázis hitelesítő adatait a POSTGRES_URL-ben');
    } else if (errorMessage.includes('connection')) {
      console.error('💡 MEGOLDÁS: Ellenőrizze, hogy az adatbázis-szerver fut-e és elérhető-e');
    }
    
    return false;
  }
}

// Típusbiztonság érdekében
export type DB = typeof db
