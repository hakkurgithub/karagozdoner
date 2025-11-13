# Vercel Environment Variables Setup

Bu proje Vercel'da deploy edilmek için aşağıdaki environment variable'ların ayarlanması gerekiyor:

## Required Environment Variables

### Admin Panel
```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = YeniSifreniz123
```

### Email Service (EmailJS)
```
EMAILJS_PUBLIC_KEY = pk_karagoz_kebab_2025
EMAILJS_SERVICE_ID = service_karagoz2025
EMAILJS_TEMPLATE_ID = template_contact_form
```

### Security
```
ENCRYPTION_KEY = karagoz_encrypt_key_2025_ultra_secure
JWT_SECRET = karagoz_kebab_jwt_secret_2025_secure_key
```

### WhatsApp Business
```
WHATSAPP_ACCESS_TOKEN = temp_whatsapp_token_karagoz2025
WHATSAPP_BUSINESS_PHONE = 36209341537
```

### Google Maps (Optional)
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = AIzaSyC9vK2xL8mN4p6qR7sT9uV1wX3yZ5aB7cD
GOOGLE_PLACES_API_KEY = AIzaSyC9vK2xL8mN4p6qR7sT9uV1wX3yZ5aB7cD
```

## Deployment Steps

1. **Vercel'a Git**:
   - https://vercel.com
   - GitHub ile giriş yapın

2. **New Project**:
   - "Import Git Repository" 
   - `karagozdoner` repository'sini seçin

3. **Environment Variables**:
   - Deploy sırasında yukarıdaki değişkenleri ekleyin
   - Settings > Environment Variables'dan da ekleyebilirsiniz

4. **Deploy**:
   - "Deploy" butonuna basın
   - Otomatik build ve deploy olacak

## Features
✅ Next.js 14.2.18
✅ GitHub-based Database (JSON)
✅ Admin Panel
✅ Hungarian Restaurant Menu
✅ Responsive Design
✅ TypeScript

## Database
- GitHub tabanlı JSON database
- No external database required
- Automatic backup with Git

## Admin Access
- URL: `your-vercel-url.vercel.app`
- Username: `admin`
- Password: `YeniSifreniz123`