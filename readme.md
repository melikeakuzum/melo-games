# MeloGames - Mini Oyunlar Platformu

MeloGames, React ve Next.js kullanılarak geliştirilmiş modern bir mini oyunlar platformudur. Kullanıcılar çeşitli eğlenceli oyunları oynayabilir ve yeteneklerini test edebilirler.

## 🚀 Kullanılan Teknolojiler

### Frontend Framework ve Kütüphaneler
- **Next.js 14**: App Router, Server Components ve diğer modern Next.js özelliklerini kullanarak SEO dostu ve performanslı bir uygulama geliştirdik
- **React 18**: useState, useEffect, useCallback, useMemo gibi hooks'ları kullanarak state yönetimi ve performans optimizasyonu sağladık
- **TypeScript**: Tip güvenliği ve daha iyi kod kalitesi için TypeScript kullandık
- **Tailwind CSS**: Hızlı ve responsive tasarım için utility-first CSS framework'ü
- **shadcn/ui**: Yeniden kullanılabilir ve özelleştirilebilir UI komponentleri için

### Performans Optimizasyonları
1. **Code Splitting ve Lazy Loading**
   - Dynamic imports ile sayfa yüklemelerini optimize ettik
   - Komponentleri lazy load ederek initial bundle size'ı küçülttük

2. **State Yönetimi**
   - useMemo ve useCallback hooks ile gereksiz render'ları önledik
   - React.memo ile komponent render optimizasyonu yaptık

3. **Asset Optimizasyonu**
   - Font optimizasyonu için font-display: swap kullandık
   - SVG ikonlar ve optimize edilmiş görseller kullandık

4. **Routing ve Navigation**
   - Next.js App Router ile optimize edilmiş routing
   - Prefetch özelliğini kontrollü kullanarak performans artışı

### Oyunlar ve Özellikleri
1. **XOX (Tic Tac Toe)**
   - İki kişilik klasik oyun
   - Zaman sınırlaması
   - Kazanan kombinasyonları görselleştirme

2. **Hafıza Kartları**
   - Eşleştirme mantığı
   - Skor takibi
   - Animasyonlu kart çevirme

3. **Renk Oyunu**
   - Refleks testi
   - Can sistemi
   - Renk değişim animasyonları

4. **Şehir Bulmaca**
   - Karışık harflerden şehir bulma
   - İpucu sistemi
   - Zaman sınırlaması

5. **Yazma Hızı Testi**
   - WPM (Words Per Minute) hesaplama
   - Doğruluk oranı
   - Gerçek zamanlı feedback

### Proje Yapısı
