// Bu dosyayı değiştirmen gerekmez. Ayarlar config.js içinde.

const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
      const priceText = typeof p.price === "number" ? `${p.price} ₺` : p.price;
      const msg = `Merhaba, "${p.name}" (${priceText}) sipariş vermek istiyorum.`;
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
            <span class="price">${esc(priceText)}</span>
            <a class="btn small" href="${wa(msg)}" target="_blank" rel="noopener">Sipariş ver</a>
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
