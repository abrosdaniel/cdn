/*!
 * Magazinus.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Мод магазина. Включает в себя множество функций для работы с товарами, корзиной и каталогом.
 * <script src = 'https://cdn.abros.dev/tilda/magazinus.js'></script>
 */
(function (d, s) {
  d.head.appendChild((s = d.createElement(atob("c2NyaXB0")))).src = atob(
    "aHR0cHM6Ly9jZG4uYWJyb3MuZGV2L2NvcHlyaWdodC5qcw=="
  );
  s.async = !0;
})(document);
window.cdnabros.magazinus = {
  // Объект товара
  product({
    name,
    price,
    image = "",
    description = "",
    sku = "",
    options = [],
    quantity = 1,
    lid = "",
    recid = "",
    unit = "",
    single = false,
    inventory = 0,
  }) {
    const timestamp = Math.floor(Date.now() / 1000);
    return {
      ...(name && { name }),
      ...(price && { price }),
      ...(image && { img: image }),
      ...(description && { description }),
      ...(sku && { sku }),
      ...(options && options.length > 0 && { options }),
      ...(quantity > 0 && { quantity }),
      ...(lid && { lid }),
      ...(recid && { recid }),
      ...(unit && { unit }),
      single: single ? "y" : "n",
      ...(inventory && { inventory }),
      ts: timestamp,
    };
  },
  // Функция добавления товара
  addProduct(product) {
    if (!window.tcart) {
      window.tcart = { products: [] };
    }

    const existingProductIndex = window.tcart.products.findIndex(
      (p) =>
        p.name === product.name &&
        p.price === product.price &&
        p.sku === product.sku
    );

    if (existingProductIndex !== -1) {
      window.tcart.products[existingProductIndex].quantity += product.quantity;
    } else {
      window.tcart.products.push(product);
    }

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("tcart", JSON.stringify(window.tcart));
    }

    tcart__reDrawCartIcon();
    tcart__showBubble(product.name + " " + tcart_dict("youAdd"));
  },
};
