# 🚀 Projeyi Çalıştırma Rehberi

Bu rehber, Karagöz Döner projesini yerel ortamınızda çalıştırmanız için gereken adımları içerir.

## ✅ Önkoşullar

Sisteminizdeki Node.js sürümünün 18+ olduğundan emin olun:
```bash
node --version
```

## 🔧 1. Kurulum Adımları

### 1.1 Bağımlılıkları Kurun
```bash
npm install
```

### 1.2 Ortam Değişkenlerini Ayarlayın

`.env.local` dosyasındaki değişkenleri doldurun:

#### NextAuth Secret Anahtarı
Zaten otomatik oluşturuldu: ✅ `AUTH_SECRET`

#### GitHub OAuth App Kurulumu
1. [GitHub Developer Settings](https://github.com/settings/developers) → OAuth Apps → New OAuth App
2. **Application name**: `Karagöz Döner`
3. **Homepage URL**: `http://localhost:3000`
4. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Client ID ve Secret'ı `.env.local` dosyasına ekleyin:
   ```bash
   AUTH_GITHUB_ID="your_github_client_id"
   AUTH_GITHUB_SECRET="your_github_client_secret"
   ```

#### Vercel Postgres Kurulumu
1. [Vercel Dashboard](https://vercel.com/dashboard) → Storage → Create Database → Postgres
2. Veritabanı adı: `karagoz-doner-db`
3. **POSTGRES_URL** değerini kopyalayıp `.env.local` dosyasına ekleyin

## 🗄️ 2. Veritabanı Kurulumu

### 2.1 Şemayı Veritabanına Push Edin
```bash
npm run db:push
```

### 2.2 Test Verilerini Ekleyin
```bash
npm run db:seed
```

### 2.3 Veritabanını Görsel Olarak İnceleyin (isteğe bağlı)
```bash
npm run db:studio
```

## 🚀 3. Projeyi Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## 🧪 4. Test Etme

### 4.1 Giriş Yapma

#### Demo Hesaplar (Yerel Test)
Geliştirme aşamasında hızlı test için:
1. http://localhost:3000/auth/signin adresine gidin
2. **Demo Kullanıcı**:
   - Kullanıcı adı: `demo`
   - Şifre: `demo`
   - Rol: B2B kullanıcısı
3. **Manager**:
   - Kullanıcı adı: `manager`
   - Şifre: `manager`
   - Rol: Yönetici

#### GitHub OAuth (Prodüksiyon)
1. GitHub OAuth App'ınızı ayarladıysanız GitHub ile giriş yapabilirsiniz
2. İlk GitHub girişinde varsayılan olarak **b2b** rolü atanır
3. Manager rolü için veritabanından manuel güncelleme gerekir

### 4.2 Rolleri Test Etme
- **Manager Rolü**: http://localhost:3000/manager (admin paneli)
- **B2B Rolü**: http://localhost:3000/dashboard (kullanıcı paneli)

### 4.3 API Testleri
- **Ürünler**: `GET /api/products`
- **Rezervasyon**: `POST /api/reservations`

## 📊 5. CMS Paneli

http://localhost:3000/admin adresinden içerik yönetim paneline erişebilirsiniz.

## ⚠️ Sorun Giderme

### Veritabanı Bağlantı Hatası
- `POSTGRES_URL` değerinin doğru olduğundan emin olun
- Vercel Postgres'in aktif olduğunu kontrol edin

### Auth Hatası
- GitHub OAuth App ayarlarını kontrol edin
- `AUTH_SECRET` değerinin ayarlandığından emin olun

### Build Hatası
```bash
npm run build
```
komutu ile hataları kontrol edin.

## 🔄 GitHub OAuth'dan Database Adapter'a Geçiş

Şu anda sistem JWT tabanlı session kullanıyor. Veritabanı tabanlı session'a geçmek için:

### 1. Veritabanı Bağlantısını Aktifleştirin
`POSTGRES_URL`'i gerçek Vercel Postgres URL'i ile güncelleyin.

### 2. NextAuth Adapter'ını Aktifleştirin
`lib/auth.ts` dosyasında:
```typescript
// Bu satırları yeniden aktifleştirin:
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db), // Bu satırı ekleyin
  // session: { strategy: "jwt" }, // Bu satırı kaldırın
  // ... geri kalan config aynı
})
```

### 3. Veritabanı Şemasını Push Edin
```bash
npm run db:push
npm run db:seed
```

### 4. GitHub OAuth Kullanıcılarına Rol Atama
GitHub ile giriş yapan kullanıcılara varsayılan olarak `b2b` rolü atanır. Manager rolü için:
```sql
UPDATE users SET role = 'manager' WHERE email = 'manager@example.com';
```

## 🎯 Sonraki Adımlar

1. ✅ Temel sistem çalışıyor (JWT auth ile)
2. 🔧 GitHub OAuth App oluşturun (opsiyonel)
3. 🗄️ Vercel Postgres bağlayın (opsiyonel - DB adapter için)
4. 🔄 UI component'lerini özelleştirin
5. 📊 Chart.js veya Recharts entegrasyonu yapın
6. 🎨 Tailwind CSS ile styling geliştirin
7. 🚀 Vercel'e deploy edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- Repository Issues bölümünü kullanın
- `.env.local` dosyasının doğru doldurulduğundan emin olun
- Terminal hata mesajlarını paylaşın