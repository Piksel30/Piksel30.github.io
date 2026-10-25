// ============================================================
//  BURAYI KENDİNE GÖRE DÜZENLE — site bu dosyadan okur
//  Kurallar: tırnaklar düz " olsun, satır sonlarındaki virgülleri silme.
// ============================================================

const SITE = {
  name: "Yiğityo 3D",
  slogan: "3D yazıcıyla üretilen spinner ball ve oyuncaklar",
  whatsapp: "905454655280",
  instagram: "yusufyigitekici",   // @ olmadan, boşluksuz. Yanlışsa düzelt.

  // Renk seçeneği olan ürünlerde görünen renkler. Elindeki filament renklerini yaz.
  colors: ["Siyah", "Beyaz", "Kırmızı", "Mavi", "Yeşil", "Sarı"],

  // Teslim süresi (SSS'de görünür). Gerçek sürene göre yaz, örn. "2-4 gün". Boşsa "ürüne göre değişir" yazar.
  deliveryDays: "",

  // Kampanya. İstemiyorsan aşağıdaki satırın başına // koy.
  // campaign: { minItems: 3, percent: 10, text: "3 ürün al, %10 indirim kazan!" },

  about:
    "Merhaba, ben Yiğit. Tüm ürünlerimi kendi 3D yazıcımda katman katman üretiyorum. " +
    "Spinner ball ve oyuncakların yanında kendi fikrini de bastırabilirsin: " +
    "ne istediğini, rengini ve ölçüsünü söyle, gerisini bana bırak."
};

// Her ürün için bir blok. Yeni ürün eklemek = bir bloğu kopyalayıp yapıştırmak.
// price: sayı yaz (örn. 100) ya da fiyat belli değilse "Fiyat sor"
// image: fotoğrafın GitHub'daki tam adı (örn. "spinner.png"). Boş bırakırsan emoji görünür.
// colors: true  -> müşteri renk seçer
// personalize: "Üzerinde yazacak isim" -> müşteri isim yazar (zorunlu)
// badge: kartın köşesindeki etiket
const PRODUCTS = [
  {
    name: "Spinner Ball",
    price: 100,
    category: "Spinner Ball",
    material: "PLA",
    size: "",
    desc: "3D yazıcıyla basılmış, elde çevirmesi çok keyifli spinner ball. Rengini seç.",
    image: "spiner.png",
    emoji: "🌀",
    colors: true
  },
  {
    name: "Kozalak Oyuncak (örnek)",
    price: "Fiyat sor",
    category: "Oyuncak",
    material: "PLA",
    size: "",
    desc: "Bu bir örnek ürün. Kendi oyuncağının adını, açıklamasını ve fiyatını yaz.",
    image: "",
    emoji: "🧸"
  },
  {
    name: "İsimli Anahtarlık",
    price: 60,
    category: "Kişiye Özel",
    material: "PLA",
    size: "",
    desc: "Üzerinde istediğin isim yazan kişiye özel anahtarlık. Rengini seç, ismini yaz.",
    image: "",
    emoji: "🔑",
    colors: true,
    personalize: "Üzerinde yazacak isim",
    badge: "Kişiye özel"
  },
  {
    name: "Kapı İsimliği",
    price: 90,
    category: "Kişiye Özel",
    material: "PLA",
    size: "",
    desc: "Oda kapısı için kişiye özel isimlik. Rengini seç, ismini yaz.",
    image: "",
    emoji: "🚪",
    colors: true,
    personalize: "Üzerinde yazacak isim",
    badge: "Kişiye özel"
  }
];
