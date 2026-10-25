# 3D Baskı Mağazası — Kurulum Rehberi

Bu site tamamen statiktir (sunucu, veritabanı, ücret yok). GitHub Pages'te ücretsiz yayınlanır.

## 1. Önce kendi bilgilerini gir
`config.js` dosyasını bir metin editörüyle (Not Defteri yeter) aç:
- `name` → mağaza adın
- `whatsapp` → `90` + numaran, başında `+` ve `0` olmadan (örn. `905321234567`)
- `instagram` → kullanıcı adın (@ olmadan)
- `PRODUCTS` → ürünlerin. Bir bloğu kopyalayıp yapıştırarak yeni ürün ekle.

Ürün fotoğrafı eklemek için:
1. Fotoğrafı `img` klasörüne koy (klasör yoksa oluştur), örn. `img/stand.jpg`
2. Üründe `image: "img/stand.jpg"` yaz
Not: Fotoğrafları yüklemeden önce küçült (genişlik ~1000 px yeterli), site hızlı açılır.

## 2. GitHub'a yükle (bilgisayarda kurulum gerekmez)
1. https://github.com adresinde ücretsiz hesap aç. Kullanıcı adını iyi seç, adresinde görünecek.
2. Sağ üstte **+ → New repository**.
3. **Repository name** kısmına tam olarak `kullaniciadin.github.io` yaz (kendi kullanıcı adınla). **Public** seç → **Create repository**.
4. Açılan sayfada **uploading an existing file** bağlantısına tıkla.
5. Bu klasördeki **tüm dosyaları** (index.html, style.css, app.js, config.js, README.md ve varsa img klasörü) sürükleyip bırak.
6. Aşağıda **Commit changes** de.

## 3. Yayını aç
1. Repository'de **Settings → Pages**.
2. **Source: Deploy from a branch**, **Branch: main**, klasör **/ (root)** → **Save**.
3. 1–3 dakika sonra siten şu adreste olur: `https://kullaniciadin.github.io`

## Sonradan değişiklik yapmak
GitHub'da dosyaya tıkla → kalem simgesi (Edit) → değiştir → **Commit changes**. Birkaç dakikada siteye yansır.

## Kendi alan adı (isteğe bağlı, ücretli)
`.com`/`.com.tr` alan adı yılda birkaç yüz TL. Almak istersen Settings → Pages → Custom domain'den bağlanır. Başlangıçta şart değil.

## Sonraki adım: kartla ödeme
Satışlar artınca iyzico veya PayTR "ödeme linki" ile sepet olmadan da kartla ödeme alabilirsin; ürün butonunu bu linke yönlendirmek yeterli.
