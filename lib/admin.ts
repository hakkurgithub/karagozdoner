// lib/admin.ts
// Ez a fájl az admin panel konfigurációját tartalmazza.
// Az itt található információk csak fejlesztési környezetben, tesztelési célokra használhatók.

export interface AdminConfig {
  username: string;
  password: string;
  sessionKey: string;
  showAdminPanel: boolean;
}

export const adminConfig = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "karagozdoner2025",
  sessionKey: "karagoz_admin_session", // === İSİM GÜNCELLEMESİ ===
  showAdminPanel: false // 👈 Alapértelmezetten false kell legyen
};