# Katkıda Bulunma Rehberi

YOLMOV projesine katkıda bulunmak istediğiniz için teşekkür ederiz! 🎉

## 🚀 Başlarken

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Git
- Google Gemini API Key

### Proje Kurulumu

1. **Repository'i fork edin**

2. **Fork'unuzu klonlayın**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOLMOV---Roadside-Assistance.git
   cd YOLMOV---Roadside-Assistance
   ```

3. **Upstream repository'yi ekleyin**
   ```bash
   git remote add upstream https://github.com/yosoyorhan/YOLMOV---Roadside-Assistance.git
   ```

4. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

5. **Environment dosyasını oluşturun**
   ```bash
   cp .env.example .env.local
   # .env.local dosyasını düzenleyip GEMINI_API_KEY ekleyin
   ```

6. **Development server'ı başlatın**
   ```bash
   npm run dev
   ```

## 📝 Geliştirme Süreci

### Branch Stratejisi

1. **Feature branch oluşturun**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Değişikliklerinizi yapın**
   - Kod yazın
   - Test edin
   - Commit edin

3. **Upstream ile senkronize olun**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push edin**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Pull Request açın**

### Commit Mesajları

Conventional Commits formatını kullanıyoruz:

```
type(scope): description

[optional body]

[optional footer]
```

**Tipler:**
- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon değişikliği
- `style`: Kod formatı (logic değişikliği yok)
- `refactor`: Kod yeniden yapılandırma
- `perf`: Performans iyileştirmesi
- `test`: Test ekleme veya düzeltme
- `chore`: Build process veya auxiliary tool değişiklikleri

**Örnekler:**
```bash
git commit -m "feat(hero): add emergency button animation"
git commit -m "fix(listing): resolve provider filter bug"
git commit -m "docs(readme): update installation steps"
```

## 🎯 Katkı Alanları

### 1. Yeni Özellikler

- Gerçek zamanlı konum takibi
- Ödeme entegrasyonu
- Bildirim sistemi
- Chatbot desteği
- Mobil uygulama

### 2. İyileştirmeler

- Performans optimizasyonu
- Erişilebilirlik (a11y)
- SEO iyileştirmeleri
- Test coverage artırma
- Dokümantasyon

### 3. Bug Düzeltmeleri

- GitHub Issues'deki bug'ları kontrol edin
- Reprodüsü ekleyin
- Test case yazın
- Çözümü implement edin

## 🧪 Test Etme

```bash
# Geliştirme modunda test
npm run dev

# Production build test
npm run build
npm run preview
```

## 📋 Pull Request Süreci

### PR Checklist

- [ ] Kod temiz ve okunabilir
- [ ] Commit mesajları conventional format'a uygun
- [ ] Yeni özellikler dokümante edilmiş
- [ ] Build başarılı
- [ ] Değişiklikler test edilmiş
- [ ] README güncellendi (gerekirse)

### PR Template

```markdown
## Değişiklik Türü
- [ ] Bug fix
- [ ] Yeni özellik
- [ ] Breaking change
- [ ] Dokümantasyon

## Açıklama
[Değişikliklerin açıklaması]

## İlgili Issue
Closes #[issue number]

## Test Edildi Mi?
- [ ] Evet
- [ ] Hayır

## Ekran Görüntüleri
[Varsa ekran görüntüleri ekleyin]
```

## 🎨 Kod Stil Rehberi

### TypeScript

```typescript
// ✅ İyi
interface Provider {
  id: string;
  name: string;
  rating: number;
}

const getProvider = (id: string): Provider | null => {
  // implementation
};

// ❌ Kötü
function getProvider(id) {
  // implementation
}
```

### React Bileşenleri

```tsx
// ✅ İyi
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// ❌ Kötü
const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### Tailwind CSS

```tsx
// ✅ İyi - Sıralı ve okunabilir
<div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md">

// ❌ Kötü - Karışık
<div className="bg-white flex px-4 shadow-md items-center rounded-lg py-2 justify-between">
```

## 🐛 Bug Raporlama

### Issue Template

```markdown
**Bug Açıklaması**
[Açık ve kısa açıklama]

**Reprodüksiyon Adımları**
1. '...' sayfasına git
2. '...' butonuna tıkla
3. Aşağı kaydır
4. Hatayı gör

**Beklenen Davranış**
[Ne olması gerektiği]

**Gerçek Davranış**
[Ne olduğu]

**Ekran Görüntüleri**
[Varsa ekleyin]

**Ortam:**
- OS: [örn. macOS, Windows, Linux]
- Browser: [örn. Chrome, Safari, Firefox]
- Version: [örn. 22]

**Ek Bilgi**
[Diğer önemli detaylar]
```

## 💡 Öneriler

### Issue Template

```markdown
**Özellik İsteği**
[Kısa açıklama]

**Problem**
[Hangi problemi çözüyor]

**Önerilen Çözüm**
[Nasıl çalışmalı]

**Alternatifler**
[Düşündüğünüz alternatifler]

**Ek Bilgi**
[Mockup, örnek, vb.]
```

## 📞 İletişim

- **GitHub Issues:** Bug ve özellik istekleri için
- **Pull Requests:** Kod katkıları için
- **Discussions:** Genel sorular ve tartışmalar için

## 📜 Code of Conduct

- Saygılı ve profesyonel olun
- Yapıcı geri bildirim verin
- Farklı görüşlere açık olun
- İşbirliğine odaklanın

## 🙏 Teşekkürler

Her türlü katkı değerlidir:
- 🐛 Bug raporları
- 💡 Özellik önerileri
- 📝 Dokümantasyon iyileştirmeleri
- 💻 Kod katkıları
- ⭐ Star vermek
- 📢 Projeyi paylaşmak

YOLMOV'u daha iyi hale getirdiğiniz için teşekkürler! ❤️
