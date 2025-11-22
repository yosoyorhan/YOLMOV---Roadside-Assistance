<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# YOLMOV - Yol Yardım Platformu 🚗⚡

Türkiye'nin akıllı yol yardım platformu. Yolda kaldığınızda size en yakın yardımı bulur.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance)

View your app in AI Studio: https://ai.studio/apps/drive/1RxJ2mHnsaPbkGtIuwzrkC9ObJ2FHABde

## ✨ Özellikler

- 🚚 **Çekici Hizmeti** - Aracınız bozulduğunda hızlı çekici desteği
- 🔋 **Akü Takviyesi** - Akünüz bittiğinde yerinde takviye
- 🛞 **Lastik Değişimi** - Lastiğiniz patladığında anında servis
- ⛽ **Yakıt Getirme** - Yolda yakıtınız bittiğinde destek
- 🚘 **Araç Kurtarma** - Zorlu koşullarda kurtarma hizmeti
- 🔧 **Genel Yol Yardım** - Tüm acil durumlarda yanınızda

### 🎯 Platform Özellikleri

- ✅ Müşteri ve Partner (Acente) girişi
- ✅ Akıllı konum tabanlı arama
- ✅ Gerçek zamanlı teklif sistemi
- ✅ Partner dashboard ile iş yönetimi
- ✅ 81 il ve tüm ilçeler için destek
- ✅ Doğrulanmış hizmet sağlayıcılar
- ✅ 7/24 hizmet desteği

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Google Gemini API Key ([buradan alın](https://aistudio.google.com/app/apikey))

### Kurulum

1. **Repoyu klonlayın**
   ```bash
   git clone https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance.git
   cd YOLMOV---Roadside-Assistance
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment değişkenlerini ayarlayın**
   ```bash
   # .env.local dosyasını oluşturun
   cp .env.example .env.local
   
   # .env.local dosyasını düzenleyin ve API anahtarınızı ekleyin
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

4. **Development server'ı başlatın**
   ```bash
   npm run dev
   ```

   Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🏗️ Build & Deploy

### Production Build

```bash
# Production build oluştur
npm run build

# Build'i yerel olarak test et
npm run preview
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

### Deploy Seçenekleri

#### 1. Vercel (Önerilen) ⚡

```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel
```

Veya GitHub reponuzu [Vercel](https://vercel.com)'a bağlayıp otomatik deploy aktif edin.

#### 2. Netlify 🌐

```bash
# Netlify CLI yükle
npm install netlify-cli -g

# Deploy et
netlify deploy --prod
```

#### 3. GitHub Pages 📄

```bash
# gh-pages paketi yükle
npm install --save-dev gh-pages

# package.json'a ekleyin:
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yosoyorhan.github.io/YOLMOV---Roadside-Assistance"
}

# Deploy et
npm run deploy
```

**Önemli:** Tüm platformlarda `GEMINI_API_KEY` environment variable'ını eklemeyi unutmayın!

Detaylı deploy talimatları için [DEPLOY.md](DEPLOY.md) dosyasına bakın.

## 🛠️ Teknoloji Stack

- **Frontend Framework:** React 19.2
- **Language:** TypeScript
- **Build Tool:** Vite 6.2
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion 12.23
- **Icons:** Lucide React
- **AI:** Google Gemini API

## 📁 Proje Yapısı

```
YOLMOV---Roadside-Assistance/
├── components/          # React bileşenleri
│   ├── Header.tsx      # Ana navigasyon
│   ├── Hero.tsx        # Ana sayfa hero bölümü
│   ├── LoginPage.tsx   # Giriş sayfası
│   ├── ListingPage.tsx # Hizmet listesi
│   ├── QuotePage.tsx   # Teklif sayfası
│   └── ...
├── App.tsx             # Ana uygulama bileşeni
├── types.ts            # TypeScript tip tanımları
├── constants.ts        # Sabit veriler ve mock data
├── vite.config.ts      # Vite konfigürasyonu
├── tsconfig.json       # TypeScript konfigürasyonu
└── package.json        # Proje bağımlılıkları
```

## 🎨 Tasarım Sistemi

- **Primary Color:** Orange (#FF7A00)
- **Secondary Color:** Light Orange (#FF9A2A)
- **Font Family:** 
  - Sans: Inter
  - Display: Poppins

## 📝 Scripts

```bash
npm run dev      # Development server başlat
npm run build    # Production build oluştur
npm run preview  # Production build'i önizle
```

## 🔐 Environment Variables

| Variable | Açıklama | Gerekli |
|----------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API anahtarı | ✅ Evet |

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Orhan** - [@yosoyorhan](https://github.com/yosoyorhan)

## 🙏 Teşekkürler

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Google AI Studio](https://aistudio.google.com/)

---

<div align="center">
Made with ❤️ in Turkey
</div>
