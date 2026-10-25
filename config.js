const SITE = {
  name: "Yiğityo 3D",
  slogan: "3D yazıcıyla üretilen spinner ball ve oyuncaklar",
  whatsapp: "905454655280",
  instagram: "yusufyigitekici",
  about:
    "Merhaba, ben Yiğit. Tüm ürünlerimi kendi 3D yazıcımda katman katman üretiyorum. " +
    "Spinner ball ve oyuncakların yanında kendi fikrini de bastırabilirsin: " +
    "ne istediğini, rengini ve ölçüsünü söyle, gerisini bana bırak."
};

const PRODUCTS = [
  {
    name: "Spinner Ball",
    price: 100,
    category: "Spinner Ball",
    material: "PLA",
    size: "",
    desc: "3D yazıcıyla basılmış, elde çevirmesi çok keyifli spinner ball. Renk seçeneği için yaz.",
    image: "spiner.png",
    emoji: "🌀"
  },
  {
    name: "kozalak (örnek)",
    price: "Fiyat için yaz",
    category: "Oyuncak",
    material: "PLA",
    size: "",
    desc: "Bu bir örnek ürün. Kendi oyuncağının adını, açıklamasını ve fiyatını yaz.",
    image: "",
    emoji: "🧸"
  },
  {
    name: "?",
    price: "Fiyat için yaz",
    category: "Oyuncak",
    material: "PLA",
    size: "",
    desc: "Bu bir örnek ürün. Kendi oyuncağının adını, açıklamasını ve fiyatını yaz.",
    image: "",
    emoji: "🎲"
  }YENİ ÖZELLİKLER İÇİN config.js'E EKLEYECEKLERİN
================================================
config.js'i silip yerine KOYMA. Sadece aşağıdaki parçaları kendi dosyana ekle.
Hiçbir şey eklemesen de site eskisi gibi çalışır, bunlar isteğe bağlı.

------------------------------------------------
1) SITE bölümüne ekle (about: ... satırından ÖNCE, virgüllere dikkat)
------------------------------------------------

  // Renk seçeneği olan ürünlerde görünen renkler. Elindeki filament renklerini yaz.
  colors: ["Siyah", "Beyaz", "Kırmızı", "Mavi", "Yeşil", "Sarı"],

  // Teslim süresi (SSS'de ve sipariş bilgisinde görünür). Gerçek sürene göre yaz.
  // Örn: "2-4 gün". Boş bırakırsan "ürüne göre değişir" yazar.
  deliveryDays: "",

  // Kampanya. İstemiyorsan bu bloğu hiç ekleme.
  // minItems: en az kaç ürün, percent: yüzde kaç indirim
  // campaign: { minItems: 3, percent: 10, text: "3 ürün al, %10 indirim kazan!" },


------------------------------------------------
2) Mevcut bir ürüne renk seçeneği vermek için
------------------------------------------------
Ürün bloğunun içine şu satırı ekle (virgül unutma):

    colors: true,

"true" yazarsan yukarıdaki renk listesi çıkar. İstersen ürüne özel liste de yazabilirsin:

    colors: ["Kırmızı", "Mavi"],

Rozet (kartın köşesinde etiket) için:

    badge: "Yeni",


------------------------------------------------
3) PRODUCTS listesine eklenecek yeni ürünler
------------------------------------------------
PRODUCTS = [ ... ] içinde, son üründen sonra virgül koyup yapıştır.
FİYATLARI KENDİNE GÖRE DEĞİŞTİR! (60 ve 90 sadece örnek.)

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

"personalize" yazan ürünlerde müşteri sepete eklemeden önce ismi yazmak zorunda.
];
