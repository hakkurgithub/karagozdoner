import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Şifreleri yükle
dotenv.config({ path: ".env.local" });

// Adresi bul (Normal yoksa Non-Pooling olanı dene)
const dbUrl = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

if (!dbUrl) {
  throw new Error("❌ Veritabanı adresi (.env.local içinde) bulunamadı!");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
});
