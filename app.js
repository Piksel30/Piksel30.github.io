// Bu dosyayı değiştirmen gerekmez. Ayarlar config.js içinde.

const CART_KEY = "yigityo3d-sepet";

const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const isNum = (v) => typeof v === "number" && isFinite(v);
const money = (n) => `${n.toLocaleString("tr-TR")} ₺`;
const priceLabel = (price) => (isNum(price) ? money(price) : String(price));

// ---------- Sepet verisi ----------
function loadCart() {
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(c) ? c.filter((i) => i && i.name && i.qty > 0) : [];
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
  let total = 0;
  let unpriced = 0;
  cart.forEach((i) => {
    if (isNum(i.price)) total += i.price * i.qty;
    else unpriced += 1;
  });
  return { total, unpriced };
}

function addToCart(name) {
  const p = PRODUCTS.find((x) => x.name === name);
  if (!p) return;
  const found = cart.find((i) => i.name === name);
  if (found) found.qty += 1;
  else cart.push({ name: p.name, price: p.price, qty: 1 });
  saveCart();
  renderCart();
  toast(`"${p.name}" sepete eklendi`);
}

function changeQty(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i !== item);
  saveCart();
  renderCart();
}

function removeItem(name) {
  cart = cart.filter((i) => i.name !== name);
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
    .map(
      (i) => `
    <div class="cart-row">
      <div class="cart-info">
        <strong>${esc(i.name)}</strong>
        <span>${esc(priceLabel(i.price))}</span>
      </div>
      <div class="qty">
        <button type="button" data-act="dec" data-name="${esc(i.name)}" aria-label="Azalt">−</button>
        <span>${i.qty}</span>
        <button type="button" data-act="inc" data-name="${esc(i.name)}" aria-label="Arttır">+</button>
      </div>
      <button type="button" class="rm" data-act="rm" data-name="${esc(i.name)}" aria-label="Sil">✕</button>
    </div>`
    )
    .join("");

  const { total, unpriced } = totals();
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("cart-note").textContent = unpriced
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
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

function orderMessage(f) {
  const lines = cart.map((i) => {
    const sub = isNum(i.price) ? money(i.price * i.qty) : "Fiyat sorulacak";
    return `- ${i.name} x${i.qty} = ${sub}`;
  });
  const { total, unpriced } = totals();
  return (
    `Merhaba, sitenizden sipariş vermek istiyorum.\n\n` +
    `Ürünler:\n${lines.join("\n")}\n\n` +
    `Toplam: ${money(total)}${unpriced ? " (+ fiyatı sorulacak ürünler)" : ""}\n\n` +
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
    const name = b.dataset.name;
    if (b.dataset.act === "inc") changeQty(name, 1);
    if (b.dataset.act === "dec") changeQty(name, -1);
    if (b.dataset.act === "rm") removeItem(name);
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

// ---------- Sayfa ----------
function init() {
  document.title = `${SITE.name} | 3D Baskı`;
  document.querySelectorAll("[data-site-name]").forEach((el) => (el.textContent = SITE.name));
  document.getElementById("slogan").textContent = SITE.slogan;
  document.getElementById("about-text").textContent = SITE.about;
  document.getElementById("year").textContent = new Date().getFullYear();

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

  document.getElementById("grid").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-add]");
    if (b) addToCart(b.dataset.add);
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
      return `
      <article class="card">
        <div class="media">${media}</div>
        <div class="body">
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.desc)}</p>
          <ul class="meta">
            ${p.material ? `<li>${esc(p.material)}</li>` : ""}
            ${p.size ? `<li>${esc(p.size)}</li>` : ""}
          </ul>
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
