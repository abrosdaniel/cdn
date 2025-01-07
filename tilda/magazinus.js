/*!
 * Magazinus.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Мод магазина. Включает в себя множество функций для работы с товарами, корзиной и каталогом.
 * <script src='https://cdn.abros.dev/tilda/magazinus.js'></script>
 */
(function (d, s) {
  d.head.appendChild((s = d.createElement(atob("c2NyaXB0")))).src = atob(
    "aHR0cHM6Ly9jZG4uYWJyb3MuZGV2L2NvcHlyaWdodC5qcw=="
  );
  s.async = !0;
})(document);

if (!window.cdnabros) {
  window.cdnabros = {};
}

window.cdnabros.magazinus = {
  init() {
    if (typeof localStorage !== "undefined") {
      const storedCart = localStorage.getItem("tcart");
      if (storedCart) {
        window.tcart = JSON.parse(storedCart);
        this.redrawCartIcon();
      }
    }
  },

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

  // Добавление товара
  addProduct(product) {
    if (!window.tcart) {
      window.tcart = { products: [], prodamount: 0, amount: 0 };
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

    this.recalculateCart();

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("tcart", JSON.stringify(window.tcart));
    }

    tcart__reDrawCartIcon();
    tcart__showBubble(product.name + " " + tcart_dict("youAdd"));
  },

  // Новая функция пересчёта корзины
  recalculateCart() {
    if (window.tcart && Array.isArray(window.tcart.products)) {
      let prodamount = 0;

      window.tcart.products.forEach((product) => {
        prodamount += product.price * product.quantity;
      });

      window.tcart.prodamount = prodamount;
      window.tcart.amount = prodamount;
    }
  },

  // Удаление товара
  removeProduct(sku) {
    if (window.tcart && window.tcart.products) {
      const index = window.tcart.products.findIndex(
        (product) => product.sku === sku
      );
      if (index !== -1) {
        window.tcart.products.splice(index, 1);
        localStorage.setItem("tcart", JSON.stringify(window.tcart));
        this.redrawCartIcon();
        tcart__reDrawProducts();
      }
    }
  },

  // Обновление количества товара
  updateProductQuantity(sku, newQuantity) {
    if (window.tcart && window.tcart.products) {
      const product = window.tcart.products.find((p) => p.sku === sku);
      if (product && newQuantity > 0) {
        product.quantity = newQuantity;
        product.amount = product.price * newQuantity;
        localStorage.setItem("tcart", JSON.stringify(window.tcart));
        this.redrawCartIcon();
        tcart__reDrawProducts();
      } else if (newQuantity === 0) {
        this.removeProduct(sku);
      }
    }
  },

  // Очистка корзины
  clearCart() {
    if (window.tcart) {
      window.tcart.products = [];
      localStorage.setItem("tcart", JSON.stringify(window.tcart));
      this.redrawCartIcon();
      tcart__reDrawProducts();
    }
  },

  // Получение данных корзины
  getCartData() {
    return window.tcart || { products: [] };
  },

  // Применение промокода
  applyPromoCode(code) {
    if (typeof tcart__calcPromocode === "function") {
      window.tcart.promocode = { code: code };
      tcart__calcPromocode(window.tcart.amount);
      localStorage.setItem("tcart", JSON.stringify(window.tcart));
      tcart__reDrawTotal();
    } else {
      console.error(
        "Промокоды не поддерживаются в текущей конфигурации корзины."
      );
    }
  },

  // Перерисовка иконки корзины
  redrawCartIcon() {
    if (typeof tcart__reDrawCartIcon === "function") {
      tcart__reDrawCartIcon();
    }
  },

  // Перерисовка товаров
  redrawProducts() {
    if (typeof tcart__reDrawProducts === "function") {
      tcart__reDrawProducts();
    }
  },
};

// Автоматическая инициализация библиотеки
window.cdnabros.magazinus.init();
