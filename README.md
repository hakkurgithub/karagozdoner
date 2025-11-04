# Karagöz Döner - NextAuth & Drizzle ORM Telepítési Útmutató

Ez a projekt NextAuth (hitelesítés) és Drizzle ORM (adatbázis) segítségével készült.

## 🚀 Telepítési Lépések

### 1. Környezeti Változók Beállítása

Töltse ki a `.env.local` fájlban lévő változókat:

#### NextAuth Titkos Kulcs
```bash
# Futtassa a terminálban
openssl rand -base64 32