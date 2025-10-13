// lib/admin.ts
// Bu dosya admin panel yapılandırması içindir.
// Buradaki bilgiler sadece geliştirme ortamında test amaçlı kullanılmalıdır.

export interface AdminConfig {
  username: string;
  password: string;
  sessionKey: string;
  showAdminPanel: boolean;
}

export const adminConfig = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "Borcan2025",
  sessionKey: "borcan_admin_session",
  showAdminPanel: false // 👈 Başlangıçta false olmalı
};
