# Yönetim Paneli Rehberi

Panel adresi (yükledikten sonra): `https://piksel30.github.io/admin.html`

## 1. Yükle (bir kerelik)
GitHub'da depona (`Piksel30.github.io`) **Add file → Upload files** ile şu 4 dosyayı yükle, **Commit changes** de:
`index.html`, `app.js`, `style.css`, `admin.html`

`config.js` ve fotoğraflara dokunma.

## 2. Panele bağlan (bir kerelik)
Panel, ayarları sitenin deposuna kendisi kaydeder. Bunun için bir **token** lazım:

1. github.com → profil resmi → **Settings** → en altta **Developer settings**
2. **Personal access tokens → Fine-grained tokens → Generate new token**
3. Token name: `yonetim-paneli` · Expiration: 90 gün
4. **Repository access → Only select repositories** → `Piksel30.github.io`
5. **Repository permissions → Contents → Read and write**
6. **Generate token**, çıkan kodu kopyala (bir daha gösterilmez)
7. Panelde **Bağlantı** sekmesine yapıştır, **Bağlan ve test et**'e bas.

"Bu cihazda hatırla"yı sadece kendi telefonunda/bilgisayarında işaretle. Token şifre gibidir: kimseyle paylaşma, ekran görüntüsü atma. 90 gün sonra süresi dolar, aynı adımlarla yenisini al.

## 3. Kampanya
**Kampanya** sekmesi: aç/kapat, şeritte görünecek yazı, indirim %, en az ürün sayısı ve son gün. **Yayınla** de. Sitede 1-3 dakika içinde şerit çıkar, sepette indirim otomatik uygulanır. Son gün geçince kendiliğinden biter.

## 4. Çekiliş
**Çekiliş** sekmesi iki parça:
1. **Duyuru:** Başlık, ödül, kurallar, son gün yaz, **Duyuruyu yayınla**. Sitede kart çıkar. Katılmak isteyen butona basınca WhatsApp'ına "çekilişe katılmak istiyorum + adı" mesajı gelir.
2. **Kazananı seç:** Katılımcı isimlerini (WhatsApp'tan, Instagram yorumlarından) her satıra bir kişi yapıştır, kazanan/yedek sayısını yaz, **Çekilişi yap**. Sonra istersen **Kazananı sitede duyur** ile gizlenmiş ismi (A*** Y***) sitede göster.

Adil olması için çekilişi canlı yayında veya ekran kaydıyla yap. Katılımı satın almaya bağlama. Çekilişin yasal şartlarını bir yetişkinle birlikte araştır (ben hukuki tavsiye veremem).

## 5. Ziyaretçi sayısı
1. goatcounter.com/signup → hesap aç, bir **code** seç (örn. `yigityo3d`)
2. GoatCounter'da **Settings → Allow adding visitor counts on your website** kutusunu işaretle
3. Panelde **Ziyaretçi** sekmesine code'u yaz, **Kaydet**
4. Kendi ziyaretlerini saymamamak için, her cihazında sitenin adresinin sonuna `#toggle-goatcounter` ekleyip bir kez aç

Panelde toplam görüntülenme sayısı görünür (birkaç saat gecikebilir). Günlük/ülke gibi ayrıntılar için GoatCounter panelini aç. Sayı, sayfa görüntülenmesidir; aynı kişi iki kez girerse iki sayılır.

## Bilmen gerekenler
- Ayarlar depoda `ayarlar.json` dosyasında durur. Elle silersen kampanya/çekiliş/sayaç kapanır, site normal çalışır.
- Panel sayfası herkese açık görünür ama token olmadan hiçbir şey yapamaz.
- İndirim, müşterinin tarayıcısında hesaplanır; siparişi WhatsApp'ta sen onayladığın için sorun olmaz, yine de toplamı kontrol et.
- Panelden kaydettikten sonra sitede değişiklik görünmezse 2-3 dakika bekle, **Ctrl+F5** yap.
