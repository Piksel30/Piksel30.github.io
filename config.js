// ============================================================
//  BURAYI KENDİNE GÖRE DÜZENLE — site bu dosyadan okur
// ============================================================

const SITE = {
  name: "Yiğityo 3D",
  slogan: "3D yazıcıyla üretilen spinner ball ve oyuncaklar",
  whatsapp: "905454655280",
  instagram: "yusufyigitekici",   // Instagram kullanıcı adını buraya yaz (@ olmadan, boşluksuz). Boş kalırsa link gizlenir.
  about:
    "Merhaba, ben Yiğit. Tüm ürünlerimi kendi 3D yazıcımda katman katman üretiyorum. " +
    "Spinner ball ve oyuncakların yanında kendi fikrini de bastırabilirsin: " +
    "ne istediğini, rengini ve ölçüsünü söyle, gerisini bana bırak."
};

// Her ürün için bir blok. Yeni ürün eklemek = bir bloğu kopyalayıp yapıştırmak.
// price: sayı yaz (örn. 100) ya da fiyat belli değilse "Fiyat için yaz"
// image: "img/dosyaadi.jpg" (fotoğrafı img klasörüne koy). Boş bırakırsan emoji görünür.
const PRODUCTS = [
  {
    name: "Spinner Ball",
    price: 100,
    category: "Spinner Ball",
    material: "PLA",
    size: "",
    desc: "3D yazıcıyla basılmış, elde çevirmesi çok keyifli spinner ball. Renk seçeneği için yaz.",
    image: image: "spinner.jpg"
    emoji: "🌀"
  },
  {
    name: "kozalak" (örnek)",
    price: "50",
    category: "Oyuncak",
    material: "PLA",
    size: "",
    desc: "Bu bir örnek ürün. Kendi oyuncağının adını, açıklamasını ve fiyatını yaz.",
    image: "",
    emoji: "🧸"
  },
  {
    name: "daha sonra" (örnek)",
    price: "Fiyat için yaz",
    category: "Oyuncak",
    material: "PLA",
    size: "",
    desc: "Bu bir örnek ürün. Kendi oyuncağının adını, açıklamasını ve fiyatını yaz.",
    image: "",
    emoji: "🎲"
  }
];
