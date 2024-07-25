/*!
 * Comparison Table.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Мод позволяющий создать из каталога сравнительную таблицу
 * <script src = 'https://cdn.abros.dev/tilda/comparisontable.js'></script>
 */

//В хедере
`
.t-store__card__mark-wrapper {display: none}
.js-product {position: relative} 
/* ICON */
.cpicon {
  position: absolute;
  z-index: 9;
  margin-right: 10px;
  top: 10px;
  left: auto;
  right: 22px;
  background: transparent;
  border-radius: 7px;
  cursor: pointer;
  display: block;
  height: 30px;
  width: 30px;
  background: url(https://static.tildacdn.com/tild6261-3331-4164-a362-393165343636/04.svg);
  background-size: contain;
}
.cpicon.ciactive {
    background: url(https://static.tildacdn.com/tild3931-3334-4630-a439-623932333637/01.svg);
    background-size: contain;
}
.ciactive img {filter: invert()}
`;

$(document).ready(function () {
  setInterval(function () {
    $(".uc-catalog .js-product").each(function () {
      var productUid = $(this).data("product-uid");
      var cpicon = $(this).find(".cpicon");
      if (cpicon.length === 0) {
        //cpicon = $('<div class="cpicon"><img src="https://static.tildacdn.com/tild6261-3331-4164-a362-393165343636/04.svg" /></div>');
        cpicon = $('<div class="cpicon"></div>');
        $(this).append(cpicon);
      }
      var localStorageData = localStorage.getItem("compare_products");
      var compareProducts = localStorageData
        ? JSON.parse(localStorageData)
        : [];
      if (compareProducts.includes(productUid)) {
        cpicon.addClass("ciactive");
      } else {
        cpicon.removeClass("ciactive");
      }
    });
    //
    $(".cmprtext .tn-atom").text(
      localStorage.getItem("compare_products")
        ? JSON.parse(localStorage.getItem("compare_products")).length
        : 0
    );
  }, 1000);

  // Обработка клика на cpicon
  $(document).on("click", ".js-product .cpicon", function () {
    var productUid = $(this).parent(".js-product").data("product-uid");
    var localStorageData = localStorage.getItem("compare_products");
    var compareProducts = localStorageData ? JSON.parse(localStorageData) : [];
    if (compareProducts.includes(productUid)) {
      compareProducts = compareProducts.filter(function (uid) {
        return uid !== productUid;
      });
      $(this).removeClass("ciactive");
    } else {
      compareProducts.push(productUid);
      $(this).addClass("ciactive");
    }
    localStorage.setItem("compare_products", JSON.stringify(compareProducts));
    console.log(localStorage.getItem("compare_products"));
    //console.log(JSON.parse(localStorage.getItem("compare_products")));
  });
});

//На странице сравнения
var productIds = [];

console.log(JSON.parse(localStorage.getItem("compare_products")));
$(document).ready(function () {
  // Функция для выполнения AJAX-запросов
  function fetchData(url) {
    return new Promise(function (resolve, reject) {
      $.getJSON(url, function (data) {
        resolve(data);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
      });
    });
  }

  var addedProducts = {}; // Объект для отслеживания добавленных товаров
  // Функция для обновления интерфейса сравнения
  function updateComparisonUI(productIds, data) {
    if (data.products) {
      var container = $(".uc-comlist .js-store-grid-cont");
      productIds.forEach(function (productId) {
        var product = data.products.find(function (item) {
          return item.uid == productId;
        });
        if (product && !addedProducts[product.uid]) {
          addedProducts[product.uid] = true;
          var characteristics = "";
          if (product.characteristics) {
            product.characteristics.forEach(function (char) {
              characteristics += "<span>" + char.value + "</span><br>";
            });
          }
          var template =
            '<div class="js-product t-store__card t-store__stretch-col t-store__stretch-col_33 t-align_left t-item" data-product-inv="' +
            product.uid +
            '" data-product-lid="' +
            product.uid +
            '" data-product-uid="' +
            product.uid +
            '" data-product-gen-uid="" data-product-pack-label="lwh" data-product-pack-m="0" data-product-pack-x="0" data-product-pack-y="0" data-product-pack-z="0" data-product-url="' +
            product.url +
            '" data-product-part-uid="470994669911" data-card-size="small" data-product-img="' +
            JSON.parse(product.gallery)[0].img +
            '"><a href="#order"><div class="t-store__card__imgwrapper" style="border-radius:0; overflow: hidden;"><img class="js-product-img t-store__card__img t-img loaded" data-original="' +
            JSON.parse(product.gallery)[0].img +
            '" src="' +
            JSON.parse(product.gallery)[0].img +
            '"></div><div class="t-store__card__textwrapper" style="height: 336px;"><div class="js-store-prod-name js-product-name t-store__card__title t-typography__title t-name t-name_xs" data-redactor-toolbar="no">' +
            product.title +
            '</div><div class="js-store-prod-descr t-store__card__descr t-typography__descr t-descr t-descr_xxs" data-redactor-toolbar="no">' +
            characteristics +
            '</div><div class="js-store-price-wrapper t-store__card__price-wrapper"><div class="t-store__card__price t-store__card__price-item t-name t-name_xs"><div class="js-product-price js-store-prod-price-val t-store__card__price-value" translate="no" data-redactor-toolbar="no" data-product-price-def="' +
            Math.round(parseFloat(product.price)) +
            '" data-product-price-def-str="' +
            Math.round(parseFloat(product.price)) +
            '">' +
            Math.round(parseFloat(product.price)) +
            '</div><div class="t-store__card__price-currency" translate="no">р.</div></div><div class="t-store__card__price_old t-store__card__price-item t-name t-name_xs"><div class="js-store-prod-price-old-val t-store__card__price-value" translate="no" data-redactor-toolbar="no">' +
            product.priceold +
            '</div><div class="t-store__card__price-currency" translate="no">р.</div></div></div></div></a><div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" style="display:none;"></div><div class="t-store__card__btns-wrapper js-store-buttons-wrapper"><a href="/#order" class="js-store-prod-btn t-store__card__btn t-btn t-btn_xs" style="' +
            $('.uc-comlist .js-product:first [href="#order"]:last').attr(
              "style"
            ) +
            '"><span class="t-store__card__btn-text">Где купить</span></a><a class="js-delete-product js-store-prod-btn t-store__card__btn t-btn t-btn_xs" style="' +
            $('.uc-comlist .js-product:first [href="#order"]:last').attr(
              "style"
            ) +
            '"><span class="t-store__card__btn-text">Удалить</span></a></div></div>';
          container.append(template);
        }
      });
    }
  }

  // Функция для выполнения AJAX-запросов и обновления интерфейса
  function fetchDataAndUpdateUI(urls, productIds) {
    var promises = urls.map(function (url) {
      return fetchData(url);
    });

    Promise.all(promises)
      .then(function (dataArray) {
        dataArray.forEach(function (data, index) {
          if (data) {
            updateComparisonUI(productIds, data);
          }
        });
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }

  // Функция для проверки состояния блока сравнения и скрытия/отображения блока .uc-comempty
  function checkEmptyState() {
    var compareProducts = JSON.parse(localStorage.getItem("compare_products"));
    if (!compareProducts || compareProducts.length === 0) {
      $(".uc-comempty").show();
      $(".uc-comlist, .uc-comtitle").remove();
    } else {
      $(".uc-comempty").hide();
    }
  }

  // Обработчик удаления товаров
  $(document).on("click", ".js-delete-product", function () {
    var productUid = $(this).closest(".js-product").data("product-uid");
    var updatedProductIds = productIds.filter(function (id) {
      return id !== productUid;
    });

    // Обновляем local storage только с актуальным списком productIds
    localStorage.setItem("compare_products", JSON.stringify(updatedProductIds));

    $(this)
      .closest(".js-product")
      .fadeOut("slow", function () {
        $(this).remove();
      });

    console.log(localStorage.getItem("compare_products"));
    productIds = updatedProductIds; // Обновляем массив productIds
    checkEmptyState();
  });

  // Задержка перед выполнением запросов
  setTimeout(function () {
    productIds = JSON.parse(localStorage.getItem("compare_products")) || [];
    if (productIds.length > 0) {
      // Массив URL для AJAX-запросов
      var urls = [
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=622649657301",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=301267315391",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=304364393531",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=290135587511",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=306966421011",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=336541243231",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=747744371131",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=127341229851",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=930582307851",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=289419554131",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=981649563081",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=454582634501",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=307800215921",
        "https://store.tildacdn.com/api/getproductslist/?storepartuid=239844671551",
      ];

      // Выполнение AJAX-запросов и обновление интерфейса
      fetchDataAndUpdateUI(urls, productIds);
      checkEmptyState(); // Проверка состояния после загрузки товаров
    }
  }, 1200);

  const slider = document.querySelector(".js-store-grid-cont");
  let isDown = false,
    startX,
    scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //скорость скролла
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });

  setInterval(function () {
    $(".cmprtext .tn-atom").text(productIds.length);
    checkEmptyState(); // Проверка состояния после обновления количества товаров
  }, 1500);
});
