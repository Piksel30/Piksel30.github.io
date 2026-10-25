// Bu dosyayı değiştirmen gerekmez. Ayarlar config.js içinde.

const CART_KEY = "yigityo3d-sepet";
const DEFAULT_COLORS = ["Siyah", "Beyaz", "Kırmızı", "Mavi", "Yeşil", "Sarı"];

const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const isNum = (v) => typeof v === "number" && isFinite(v);
const money = (n) => `${n.toLocaleString("tr-TR")} ₺`;
const priceLabel = (price) => (isNum(price) ? money(price) : String(price));

const siteColors = () =>
  Array.isArray(SITE.colors) && SITE.colors.length ? SITE.colors : DEFAULT_COLORS;
const colorList = (p) => (Array.isArray(p.colors) ? p.colors : p.colors === true ? siteColors() : []);
const optText = (i) =>
  [i.color ? `Renk: ${i.color}` : "", i.text ? `Yazı: ${i.text}` : ""].filter(Boolean).join(" · ");

// ---------- Sepet verisi ----------
function loadCart() {
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(c)
      ? c.filter((i) => i && i.name && i.qty > 0).map((i) => ({ ...i, id: i.id || i.name }))
      : [];
  } catch (e) {
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {}
}
let cart = loadCart();

function totals() {
  let sub = 0;
  let unpriced = 0;
  let n = 0;
  cart.forEach((i) => {
    if (isNum(i.price)) {
      sub += i.price * i.qty;
      n += i.qty;
    } else unpriced += 1;
  });
  let discount = 0;
  const c = SITE.campaign;
  if (c && isNum(c.percent) && isNum(c.minItems) && n >= c.minItems) {
    discount = Math.round((sub * c.percent) / 100);
  }
  return { sub, discount, total: sub - discount, unpriced };
}

function addToCart(name, color, text, input) {
  const p = PRODUCTS.find((x) => x.name === name);
  if (!p) return;
  if (p.personalize && !text) {
    toast(`Lütfen "${p.personalize}" alanını doldur`);
    if (input) input.focus();
    return;
  }
  const id = [p.name, color, text].join("|");
  const found = cart.find((i) => i.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, name: p.name, price: p.price, qty: 1, color, text });
  saveCart();
  renderCart();
  if (input) input.value = "";
  toast(`"${p.name}" sepete eklendi`);
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i !== item);
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

// ---------- Sepet arayüzü ----------
function renderCart() {
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const badge = document.getElementById("cart-count");
  badge.textContent = count;
  badge.classList.toggle("on", count > 0);

  const box = document.getElementById("cart-items");
  const foot = document.getElementById("cart-foot");

  if (!cart.length) {
    box.innerHTML = `<p class="empty">Sepetin boş. Ürünlerden "Sepete ekle" diyerek ekleyebilirsin.</p>`;
    foot.hidden = true;
    return;
  }
  foot.hidden = false;

  box.innerHTML = cart
    .map((i) => {
      const o = optText(i);
      return `
    <div class="cart-row">
      <div class="cart-info">
        <strong>${esc(i.name)}</strong>
        <span>${esc(priceLabel(i.price))}${o ? " · " + esc(o) : ""}</span>
      </div>
      <div class="qty">
        <button type="button" data-act="dec" data-id="${esc(i.id)}" aria-label="Azalt">−</button>
        <span>${i.qty}</span>
        <button type="button" data-act="inc" data-id="${esc(i.id)}" aria-label="Arttır">+</button>
      </div>
      <button type="button" class="rm" data-act="rm" data-id="${esc(i.id)}" aria-label="Sil">✕</button>
    </div>`;
    })
    .join("");

  const t = totals();
  document.getElementById("cart-total").textContent = money(t.total);
  const dRow = document.getElementById("disc-row");
  dRow.hidden = !t.discount;
  if (t.discount) {
    document.getElementById("disc-label").textContent = `İndirim (%${SITE.campaign.percent})`;
    document.getElementById("disc-val").textContent = `-${money(t.discount)}`;
  }
  document.getElementById("cart-note").textContent = t.unpriced
    ? "Fiyatı belli olmayan ürünler toplama dahil değildir, WhatsApp'ta netleştirilir. Kargo ücreti de orada konuşulur."
    : "Kargo ücreti WhatsApp'ta netleştirilir.";
}

function openCart() {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
  document.getElementById("drawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("drawer").setAttribute("aria-hidden", "true");
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function orderMessage(f) {
  const lines = cart.map((i) => {
    const sub = isNum(i.price) ? money(i.price * i.qty) : "Fiyat sorulacak";
    const o = optText(i);
    return `- ${i.name}${o ? ` (${o})` : ""} x${i.qty} = ${sub}`;
  });
  const t = totals();
  return (
    `Merhaba, sitenizden sipariş vermek istiyorum.\n\n` +
    `Ürünler:\n${lines.join("\n")}\n\n` +
    (t.discount ? `İndirim: -${money(t.discount)}\n` : "") +
    `Toplam: ${money(t.total)}${t.unpriced ? " (+ fiyatı sorulacak ürünler)" : ""}\n\n` +
    `Ad Soyad: ${f.get("name")}\n` +
    `Adres: ${f.get("address")}\n` +
    `Not: ${f.get("note") || "-"}\n\n` +
    `Ödeme ve kargo ücretini konuşalım.`
  );
}

function setupCart() {
  document.getElementById("open-cart").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document.getElementById("overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  document.getElementById("cart-items").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const id = b.dataset.id;
    if (b.dataset.act === "inc") changeQty(id, 1);
    if (b.dataset.act === "dec") changeQty(id, -1);
    if (b.dataset.act === "rm") removeItem(id);
  });

  document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  document.getElementById("order-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart.length) return;
    window.open(wa(orderMessage(new FormData(e.target))), "_blank", "noopener");
  });

  renderCart();
}

// ---------- SSS ----------
function faqList() {
  if (Array.isArray(SITE.faq) && SITE.faq.length) return SITE.faq;
  const when = SITE.deliveryDays
    ? `Basım ve hazırlık süresi yaklaşık ${SITE.deliveryDays}, kargo süresi bunun üzerine eklenir.`
    : "Basım süresi ürüne göre değişir. Sipariş verdiğinde WhatsApp'ta net süreyi söylerim.";
  return [
    { q: "Nasıl sipariş veririm?", a: "Ürünleri sepete ekle, adını ve adresini yaz, siparişi WhatsApp'a gönder. Ödeme ve kargo ücreti seninle WhatsApp'ta konuşulur." },
    { q: "Teslimat ne kadar sürer?", a: when },
    { q: "Nasıl ödeme yaparım?", a: "Ödeme yöntemi sipariş sırasında WhatsApp'ta birlikte belirlenir. Sitede kart bilgisi istenmez." },
    { q: "Renk seçebilir miyim?", a: "Renk seçeneği olan ürünlerde sepete eklerken rengi seçersin. Listede olmayan bir renk istersen WhatsApp'tan yaz." },
    { q: "İsimli ürünlerde yazı nasıl basılır?", a: "İsim ve yazılar sipariş sırasında girdiğin gibi basılır, o yüzden göndermeden önce kontrol et." },
    { q: "İade var mı?", a: "Üretim hatası olursa yaz, birlikte çözelim. Kişiye özel basılan ürünlerde iade şartları sipariş öncesinde belirlenir." },
    { q: "Kendi tasarımımı bastırabilir miyim?", a: "Evet. 'Kendi fikrini bastır' formuna ne istediğini yaz, fiyat ve süreyi birlikte netleştirelim." }
  ];
}

function renderFaq() {
  document.getElementById("faq-list").innerHTML = faqList()
    .map((x) => `<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`)
    .join("");
}

// ---------- Sayfa ----------
function init() {
  document.title = `${SITE.name} | 3D Baskı`;
  document.querySelectorAll("[data-site-name]").forEach((el) => (el.textContent = SITE.name));
  document.getElementById("slogan").textContent = SITE.slogan;
  document.getElementById("about-text").textContent = SITE.about;
  document.getElementById("year").textContent = new Date().getFullYear();

  const promo = document.getElementById("promo");
  if (SITE.campaign && SITE.campaign.text) {
    promo.textContent = SITE.campaign.text;
    promo.hidden = false;
  }

  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = wa("Merhaba, sitenizden yazıyorum.");
  });
  document.querySelectorAll("[data-ig]").forEach((el) => {
    if (SITE.instagram) el.href = `https://instagram.com/${SITE.instagram}`;
    else el.style.display = "none";
  });

  buildFilters();
  renderProducts("Tümü");
  setupCustomForm();
  setupCart();
  renderFaq();

  document.getElementById("grid").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-add]");
    if (!b) return;
    const card = b.closest(".card");
    const sel = card.querySelector('[data-opt="color"]');
    const input = card.querySelector('[data-opt="text"]');
    addToCart(b.dataset.add, sel ? sel.value : "", input ? input.value.trim() : "", input);
  });
}

function buildFilters() {
  const cats = ["Tümü", ...new Set(PRODUCTS.map((p) => p.category))];
  const box = document.getElementById("filters");
  box.innerHTML = cats
    .map((c, i) => `<button class="chip${i === 0 ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
    .join("");
  box.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    box.querySelectorAll(".chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.cat);
  });
}

function renderProducts(cat) {
  const list = PRODUCTS.filter((p) => cat === "Tümü" || p.category === cat);
  document.getElementById("grid").innerHTML = list
    .map((p) => {
      const media = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
        : `<div class="emoji">${esc(p.emoji || "🧩")}</div>`;
      const colors = colorList(p);
      const opts =
        colors.length || p.personalize
          ? `<div class="opts">
              ${
                colors.length
                  ? `<label>Renk<select data-opt="color">${colors
                      .map((c) => `<option>${esc(c)}</option>`)
                      .join("")}</select></label>`
                  : ""
              }
              ${
                p.personalize
                  ? `<label>${esc(p.personalize)}<input data-opt="text" maxlength="24" placeholder="Örn: Ali"></label>`
                  : ""
              }
            </div>`
          : "";
      return `
      <article class="card">
        <div class="media">${media}${p.badge ? `<span class="tag">${esc(p.badge)}</span>` : ""}</div>
        <div class="body">
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.desc)}</p>
          <ul class="meta">
            ${p.material ? `<li>${esc(p.material)}</li>` : ""}
            ${p.size ? `<li>${esc(p.size)}</li>` : ""}
          </ul>
          ${opts}
          <div class="buy">
            <span class="price">${esc(priceLabel(p.price))}</span>
            <button type="button" class="btn small" data-add="${esc(p.name)}">Sepete ekle</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function setupCustomForm() {
  document.getElementById("custom-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const text =
      `Merhaba, özel baskı istiyorum.\n` +
      `Ad: ${f.get("name")}\n` +
      `Ne istiyorum: ${f.get("what")}\n` +
      `Ölçü: ${f.get("size") || "-"}\n` +
      `Renk: ${f.get("color") || "-"}\n` +
      `Adet: ${f.get("qty") || 1}`;
    window.open(wa(text), "_blank", "noopener");
  });
}

init();
