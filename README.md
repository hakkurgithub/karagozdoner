# Karagöz Döner - NextAuth & Drizzle ORM Kurulum Kılavuzu

Bu proje NextAuth (kimlik doğrulama) ve Drizzle ORM (veritabanı) ile yapılandırılmıştır.

## 🚀 Kurulum Adımları

### 1. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyasındaki değişkenleri doldurun:

#### NextAuth Secret Anahtarı
```bash
# Terminal'de çalıştırın
openssl rand -base64 32
```
Çıktıyı `AUTH_SECRET` değişkenine yapıştırın.

#### GitHub OAuth App Oluşturun
1. GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
2. **Application name**: Karagöz Döner
3. **Homepage URL**: `http://localhost:3000`
4. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Client ID ve Client Secret'ı `.env.local` dosyasına yazın

#### Vercel Postgres Kurumu
1. [Vercel Dashboard](https://vercel.com/dashboard) > Storage > Create Database > Postgres
2. Veritabanı bağlantı string'ini `POSTGRES_URL` değişkenine yazın

### 2. Veritabanı Migration'larını Çalıştırın

```bash
# Migration dosyalarını oluştur
npm run db:generate

# Migration'ları veritabanına uygula
npm run db:migrate

# Alternatif: Schema'yı direkt push et (geliştirme için)
npm run db:push
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## 📊 Veritabanı Yönetimi

### Drizzle Studio
Veritabanınızı görsel olarak yönetmek için:
```bash
npm run db:studio
```

### Mevcut Komutlar
- `npm run db:generate` - Migration dosyları oluştur
- `npm run db:migrate` - Migration'ları uygula
- `npm run db:push` - Schema'yı direkt push et
- `npm run db:studio` - Drizzle Studio'yu aç

## 🗄️ Veritabanı Şeması

Proje aşağıdaki tabloları içerir:

### Kimlik Doğrulama Tabloları (NextAuth)
- `users` - Kullanıcılar (role ile genişletilmiş)
- `accounts` - OAuth hesap bilgileri
- `sessions` - Oturum bilgileri
- `verificationTokens` - Email doğrulama

### Restoran İş Mantığı Tabloları
- `products` - Menü ürünleri (kuruş cinsinden fiyat)
- `orders` - Siparişler
- `order_items` - Sipariş detayları
- `reservations` - Masa rezervasyonları

### Kullanıcı Rolleri
- `b2b` - İşletme müşterileri
- `manager` - Yöneticiler (admin paneli erişimi)

## 🔐 Kimlik Doğrulama

### Giriş/Çıkış URL'leri
- Giriş: `/auth/signin`
- Çıkış: `/auth/signout`
- Hata: `/auth/error`

### Kullanım Örneği
```tsx
import { auth } from "@/lib/auth"

export default async function Page() {
  const session = await auth()
  
  if (!session) {
    return <div>Giriş yapmalısınız</div>
  }
  
  return <div>Merhaba {session.user?.name}</div>
}
```

## 🚀 Production Deployment

1. Vercel'e deploy edin
2. `.env.local` değişkenlerini Vercel Environment Variables'a ekleyin
3. `NEXTAUTH_URL`'i production URL'iniz ile güncelleyin
4. GitHub OAuth App'inize production callback URL'ini ekleyin

## 📝 Notlar

- Güvenlik amacıyla `.env.local` dosyası `.gitignore`'a eklenmiştir
- Geliştirme için `.env.example` dosyasını referans alın
- Production'da mutlaka güçlü `AUTH_SECRET` kullanın

## 🆘 Sorun Giderme

### NextAuth Hataları
- `AUTH_SECRET` değişkeninin doğru ayarlandığından emin olun
- GitHub OAuth App callback URL'lerini kontrol edin

### Veritabanı Hataları
- `POSTGRES_URL` bağlantı string'ini kontrol edin
- Migration'ların doğru çalıştığından emin olun

### Type Script Hataları
- `npm run build` ile kontrol edin
- Import path'lerini kontrol edin

---

## Next.js Bilgileri

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
