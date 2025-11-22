# YOLMOV - Yol Yardım Platformu Deploy Rehberi

## 🚀 Deploy Seçenekleri

### 1. Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance)

**Adımlar:**
1. GitHub reponuzu Vercel'a bağlayın
2. Environment Variables bölümünde `GEMINI_API_KEY` ekleyin
3. Deploy edin!

**Vercel CLI ile:**
```bash
npm i -g vercel
vercel login
vercel
```

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance)

**Adımlar:**
1. GitHub reponuzu Netlify'a bağlayın
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment Variables bölümünde `GEMINI_API_KEY` ekleyin

**Netlify CLI ile:**
```bash
npm install netlify-cli -g
netlify login
netlify init
netlify deploy --prod
```

### 3. GitHub Pages

```bash
# gh-pages branch'ine deploy için
npm install --save-dev gh-pages
```

`package.json` dosyasına ekleyin:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yosoyorhan.github.io/YOLMOV---Roadside-Assistance"
}
```

Deploy:
```bash
npm run deploy
```

## 📋 Environment Variables

Tüm platformlarda aşağıdaki environment variable'ı eklemelisiniz:

- `GEMINI_API_KEY`: Google Gemini API anahtarınız
  - [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) adresinden alın

## 🔧 Lokal Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyasını düzenle ve GEMINI_API_KEY ekle
# Development server başlat
npm run dev

# Production build
npm run build

# Production build'i önizle
npm run preview
```

## 📱 Özellikler

- ✅ React 19.2 + TypeScript
- ✅ Vite ile hızlı build
- ✅ Tailwind CSS responsive tasarım
- ✅ Framer Motion animasyonlar
- ✅ 6 farklı yol yardım hizmeti
- ✅ Müşteri ve Partner dashboard
- ✅ Türkiye geneli 81 il desteği

## 📄 Lisans

MIT License

## 👨‍💻 Geliştirici

Orhan - [@yosoyorhan](https://github.com/yosoyorhan)
