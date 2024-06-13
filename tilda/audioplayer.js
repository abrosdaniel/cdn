/*!
 * Player.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Мод позволяющий создать из каталога плеер
 * <script src = 'https://cdn.abros.dev/tilda/audioplayer.js'></script>
 */
loadScript("https://cdn.abros.dev/copyright.js", {
  banner: "true",
  time: "100",
}); // Копирайт
function loadScript(src, dataAttrs = {}) {
  const script = document.createElement("script");
  script.src = src;
  for (const [key, value] of Object.entries(dataAttrs)) {
    script.setAttribute(`data-${key}`, value);
  }
  document.head.appendChild(script);
}
// Переменные стилей
// Обложка для карточек
const sWBgClr = window.AbrosTildaPlayer.WrapperBackgroundColor; // Цвет обложки для карточек
const sWBrdRd = window.AbrosTildaPlayer.WrapperBorderRadius; // Скругление обложки для карточек
const sWPlay = window.AbrosTildaPlayer.WrapperPlay; // Иконка кнопки Play
const sWPause = window.AbrosTildaPlayer.WrapperPause; // Иконка кнопки Pause
// Input громкости и прогресса песни
const sTSClrS = window.AbrosTildaPlayer.TrackSlideColorStart; // Цвет полосок
const sTSClrE = window.AbrosTildaPlayer.TrackSlideColorEnd; // Цвет заполнения полосок
const sTSBrdRd = window.AbrosTildaPlayer.TrackSlideBorderRadius; // Скругление полосок
const sTTClr = window.AbrosTildaPlayer.TrackThumbColor; // Цвет тумблера
const sTTBrdRd = window.AbrosTildaPlayer.TrackThumbBorderRadius; // Скругление тумблера
// Плеер
const sPPlay = window.AbrosTildaPlayer.PlayerPlay; // Иконка кнопки Play
const sPPause = window.AbrosTildaPlayer.PlayerPause; // Иконка кнопки Pause
const sPVlmOn = window.AbrosTildaPlayer.PlayerVolumeOn; // Иконка кнопки Вкл.Звук
const sPVlmOff = window.AbrosTildaPlayer.PlayerVolumeOff; // Иконка кнопки Выкл.Звук

// Пееременные каталога
const catalogID = window.AbrosTildaPlayer.catalogID;
const catalog = document.querySelector(catalogID);
const storeGrid = catalog.querySelector(".js-store-grid-cont");

// Переменные аудио
const audioID = window.AbrosTildaPlayer.audioID;
const audio = document.querySelector(audioID);

// Переменные плеера
const playerID = window.AbrosTildaPlayer.playerID;
const player = document.querySelector(playerID);
const volumeInput = player.querySelector('input[name="volume"]');
const progressInput = player.querySelector('input[name="progress"]');

// Переменные тригера
const areaID = window.AbrosTildaPlayer.areaID;
const area = document.querySelector(areaID);

// Переменные мода
const assistant = window.AbrosTildaPlayer.assistant;
const tracksOnPage = window.AbrosTildaPlayer.cards;
let idArr = new Array();
let playlist = new Array();
let products;
let productsArr;
let onElement = false;

const areaEnter = () => {
  player.classList.add("show");
};

const areaLeave = () => {
  setTimeout(() => {
    isPlaying() ? false : onElement ? false : player.classList.remove("show");
  }, 1000);
};

const playerInfo = () => {
  const cover = player.querySelector(".player-cover .tn-atom");
  const title = player.querySelector(".player-title .tn-atom");
  const btnPrev = player.querySelector(".player-prev .tn-atom");
  const btnPlay = player.querySelector(".player-play .tn-atom");
  const btnNext = player.querySelector(".player-next .tn-atom");
  const btnBuy = player.querySelector(".player-btn-buy .tn-atom");
  const btnText = player.querySelector(".player-text .tn-atom");
  const btnVolume = player.querySelector(".player-volume .tn-atom");
  btnPlay.removeEventListener("click", playPause);
  btnNext.removeEventListener("click", playNext);
  btnPrev.removeEventListener("click", playPrev);
  btnVolume.removeEventListener("click", volumeOnOff);
  volumeInput.removeEventListener("input", volumeControl);
  title.innerHTML = nowPlaying().title;
  cover.style.backgroundImage = `url(${
    JSON.parse(nowPlaying().gallery)[0].img
  })`;
  btnBuy.setAttribute("href", nowPlaying().url);
  btnText.setAttribute("href", nowPlaying().url);
  btnPlay.addEventListener("click", playPause);
  btnNext.addEventListener("click", playNext);
  btnPrev.addEventListener("click", playPrev);
  btnVolume.addEventListener("click", volumeOnOff);
  volumeInput.addEventListener("input", volumeControl);
  volumeInput.dispatchEvent(new Event("input", { bubbles: true }));
  progressInput.addEventListener("input", progressListen);
  progressInput.dispatchEvent(new Event("input", { bubbles: true }));
  player.classList.add("show");
  progressListen();
  autoplay();
};

const getNextSibling = (elem, selector) => {
  let sibling = elem.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

const getPrevSibling = (elem, selector) => {
  let sibling = elem.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

const setLsAudio = (product) => {
  let audioLsObj = new Object();
  audioLsObj.uid = product.uid;
  audioLsObj.title = product.title;
  audioLsObj.cover = JSON.parse(product.gallery)[0].img;
  audioLsObj.link = product.characteristics.find(
    (song) => song.title === "music"
  ).value;
  window.localStorage.setItem("audio", JSON.stringify(audioLsObj));
};

const nothing = (e) => {
  e.preventDefault();
};

const playingSame = (link) => {
  return link != null && link === audio.src ? true : false;
};

const isPlaying = () => {
  return !audio.paused;
};

const nowPlaying = () => {
  return playlist[Number(audio.dataset.trackNumber)];
};

const autoplay = () => {
  audio.removeEventListener("ended", playNext, false);
  audio.addEventListener("ended", playNext, false);
};

const trackLink = (product) => {
  return product.characteristics.find((song) => song.title === "music").value;
};

const playPauseBtnOnProduct = (e, product) => {
  let pagination = catalog.querySelector(".t-store__pagination");
  let activePage = pagination ? Number(pagination.dataset.activePage) : 1;
  let trackNum = productsArr.indexOf(product) + (activePage - 1) * tracksOnPage;
  trackNum =
    trackNum < playlist.length ? trackNum : productsArr.indexOf(product);
  let track = trackNum !== -1 ? trackLink(playlist[trackNum]) : 0;
  let playWrapper = document.createElement("div");
  playWrapper.classList.add("play-wrapper");
  let playPauseBtn = document.createElement("div");
  playPauseBtn.classList.add("btn-music");
  isPlaying() && audio.src === track
    ? playPauseBtn.classList.add("pause")
    : playPauseBtn.classList.add("play");
  playWrapper.appendChild(playPauseBtn);
  e !== null
    ? e.target.appendChild(playWrapper)
    : product.querySelector(".js-product-img").appendChild(playWrapper);
  playPauseBtn.addEventListener("click", playPause);
};

const enter = (e) => {
  e.preventDefault();
  product = e.target.closest(".js-product");
  playPauseBtnOnProduct(e, product);
};

const leave = (e) => {
  e.preventDefault();
  e.target.replaceChildren();
};

const playPause = (e) => {
  if (e.target.classList.contains("btn-music")) {
    e.preventDefault();
    product = e.target.closest(".js-product");
    let pagination = catalog.querySelector(".t-store__pagination");
    let activePage = pagination ? Number(pagination.dataset.activePage) : 1;
    let trackNum =
      productsArr.indexOf(product) + (activePage - 1) * tracksOnPage;
    trackNum =
      trackNum < playlist.length ? trackNum : productsArr.indexOf(product);
    let track =
      trackNum !== -1 ? trackLink(playlist[trackNum]) : trackLink(playlist[0]);
    if (audio.src !== track) {
      for (let pauseBtn of storeGrid.querySelectorAll(".btn-music.pause")) {
        pauseBtn.classList.remove("pause");
        pauseBtn.classList.add("play");
      }
      e.target.classList.add("pause");
      audio.src = track;
    } else {
      e.target.classList.remove("play");
      e.target.classList.remove("pause");
      if (isPlaying()) {
        e.target.classList.add("play");
      } else {
        e.target.classList.add("pause");
      }
    }
  }
  if (audio.src === "") {
    let num = 0;
    audio.dataset.trackNumber = num;
    audio.src = trackLink(playlist[num]);
  } else {
    let num = playlist.map((obj) => trackLink(obj) === audio.src).indexOf(true);
    audio.dataset.trackNumber = num;
  }
  isPlaying() ? audio.pause() : audio.play();
  let btnPlayImg = player.querySelector(".player-play .tn-atom img");
  btnPlayImg.src = isPlaying() ? `${sPPause}` : `${sPPlay}`;
  playerInfo();
};

const playNext = () => {
  let numNow = Number(audio.dataset.trackNumber);
  let numNew = numNow + 1 < playlist.length ? numNow + 1 : 0;
  audio.src = trackLink(playlist[numNew]);
  audio.dataset.trackNumber = numNew;
  // isPlaying() ? audio.play() : audio.pause();
  audio.play();
  playerInfo();
};

const playPrev = () => {
  let numNow = Number(audio.dataset.trackNumber);
  let numNew = numNow - 1 > -1 ? numNow - 1 : playlist.length - 1;
  audio.src = trackLink(playlist[numNew]);
  audio.dataset.trackNumber = numNew;
  // isPlaying() ? audio.play() : audio.pause();
  audio.play();
  playerInfo();
};

const volumeOnOff = () => {
  audio.volume = audio.volume === 0 ? (audio.volume = 1) : (audio.volume = 0);
  let volume = document.querySelector(".player-volume img");
  if (audio.volume === 0) {
    volume.src = `${sPVlmOff}`;
    volumeInput.value = "0";
    volumeInput.style.setProperty(
      "--gradient",
      `linear-gradient(90deg, ${sTSClrS} 0%, ${sTSClrS} 100%)`
    );
  } else {
    volume.src = `${sPVlmOn}`;
    volumeInput.value = "100";
    volumeInput.style.setProperty(
      "--gradient",
      `linear-gradient(90deg, ${sTSClrE} 0%, ${sTSClrE} 100%)`
    );
  }
};

const volumeControl = (e) => {
  let per = e.target.value + "%";
  e.target.style.setProperty(
    "--gradient",
    `linear-gradient(90deg, ${sTSClrE} 0%, ${sTSClrE} ${per}, ${sTSClrS} ${per}, ${sTSClrS} 100%)`
  );
  audio.volume = Number(e.target.value) / 100;
};

const progressControl = () => {
  let per = Math.ceil((audio.currentTime * 100) / audio.duration) || 0;
  progressInput.value = String(per);
  per += "%";
  progressInput.style.setProperty(
    "--gradient",
    `linear-gradient(90deg, ${sTSClrE} 0%, ${sTSClrE} ${per}, ${sTSClrS} ${per}, ${sTSClrS} 100%)`
  );
};

const progressListen = (e) => {
  e && e.target.value && audio.duration
    ? (audio.currentTime = Math.ceil(
        (Number(e.target.value) / 100) * audio.duration
      ))
    : false;
  audio.removeEventListener("timeupdate", progressControl);
  audio.addEventListener("timeupdate", progressControl);
};

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    let storepart = window.AbrosTildaPlayer.storepart;
    let n = {
        storepartuid: storepart,
        recid: parseInt(catalog.id.substr(3)),
        productuid: id,
        c: new Date(),
      },
      d = new XMLHttpRequest();
    (d.onload = function () {
      if (d.readyState === d.DONE && 200 === d.status) {
        let response = JSON.parse(d.responseText);
        if (response.product.characteristics.length > 0) {
          let chars = response.product.characteristics;
          let link = chars.find((song) => song.title === "music").value;
          resolve(link);
        } else {
          resolve(false);
        }
      }
    }),
      (d.ontimeout = d.onerror =
        function () {
          console.log("Can't get product");
        }),
      window.t_store_endpoint ||
        (window.t_store_endpoint = "store.tildacdn.com"),
      d.open(
        "GET",
        "https://" +
          window.t_store_endpoint +
          "/api/getproduct/?" +
          t_store__serializeData(n)
      ),
      (d.timeout = 2e4),
      d.send();
  });
};

const getProducts = (idArr) => {
  return new Promise((resolve, reject) => {
    let c = Date.now(),
      dataObj = {
        productsuid: idArr,
        c: c,
      };
    dataObj.projectid =
      document.getElementById("allrecords").dataset.tildaProjectId;
    window.t_store_endpoint || (window.t_store_endpoint = "store.tildacdn.com");
    let apiUrl =
      "https://" + window.t_store_endpoint + "/api/getproductsbyuid/";
    dataObj = JSON.stringify(dataObj);
    let xhr = new XMLHttpRequest();
    (xhr.onload = function () {
      if (xhr.readyState === xhr.DONE && 200 === xhr.status) {
        let response = JSON.parse(xhr.responseText);
        resolve(response.products);
      } else {
        resolve(false);
      }
    }),
      (xhr.ontimeout = xhr.onerror =
        function () {
          console.error(
            "Can't get getproductsbyuid. Requesting idArr: " + idArr
          ),
            "function" == typeof onFail && onFail(xhr);
        }),
      xhr.open("POST", apiUrl),
      (xhr.timeout = 2e4),
      xhr.send(dataObj);
  });
};

storeGrid.addEventListener("tStoreRendered", function (e) {
  let popup = catalog.querySelector(".t-popup");
  popup ? popup.remove() : false;
  products = storeGrid.querySelectorAll(".js-product");
  productsArr = new Array();
  idArr = new Array();
  productsArr = Array.from(products);

  products.forEach((product) => {
    let productID = product.dataset.productGenUid;
    idArr.push(productID);
  });
  getProducts(idArr)
    .then((res) => {
      if (res) {
        playlist = res;
        playlist = playlist.sort(
          (a, b) => idArr.indexOf(a.uid) - idArr.indexOf(b.uid)
        );
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          products.forEach((product) => playPauseBtnOnProduct(null, product));
          areaEnter();
        } else {
          let covers = document.querySelectorAll(".js-product-img");
          for (let cover of covers) {
            cover.removeEventListener("mouseenter", enter);
            cover.removeEventListener("mouseleave", leave);
            cover.addEventListener("mouseenter", enter);
            cover.addEventListener("mouseleave", leave);
          }
          area.removeEventListener("mouseenter", areaEnter);
          area.removeEventListener("mouseleave", areaLeave);
          area.addEventListener("mouseenter", areaEnter);
          area.addEventListener("mouseleave", areaLeave);
        }
        player.removeEventListener("mouseover", () => {
          onElement = true;
        });
        player.removeEventListener("mouseleave", () => {
          onElement = false;
        });
        player.addEventListener("mouseover", () => {
          onElement = true;
        });
        player.addEventListener("mouseleave", () => {
          onElement = false;
        });
        // playerInfo();
      } else {
        console.error("Ошибка");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Стили для плеера
var stylePlayer = document.createElement("style");
stylePlayer.textContent = `
    /* Область для плеера */
    ${areaID} {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        z-index: 90;
    }
    /* Сам плеер */
    ${playerID} {
        position: fixed;
        bottom: -85px;
        left: 0;
        width: 100%;
        z-index: 100;
        transition: bottom .2s ease-in-out;
    }
    ${playerID}.show {
        bottom: 0px;
    }
    /* Элементы плеера */
    ${playerID} .player-cover,
    ${playerID} .player-prev,
    ${playerID} .player-play,
    ${playerID} .player-next,
    ${playerID} .player-volume,
    ${playerID} .player-volume-picker,
    ${playerID} .player-volume-full,
    ${playerID} .player-progress-picker,
    ${playerID} .player-progress-full,
    ${playerID} .player-text,
    ${playerID} .player-title {
        cursor: pointer;
    }
    ${playerID} .player-cover .tn-atom {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    ${playerID} .player-prev.disabled .tn-atom,
    ${playerID} .player-next.disabled .tn-atom {
        opacity: .5;
        pointer-events: none;
    }
    ${playerID} .player-title {
        top: 50% !important;
        transform: translateY(-50%);
    }
    
    /* Кнопки play/pause и многоточие на карточках товаров */
    /* Wrapper для элементов */
    .play-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: ${sWBgClr};
        border-radius: ${sWBrdRd};
    }
    /* Кнопки play/pause */
    .btn-music {
        width: 60px;
        height: 60px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%) scale(100%);
        transition: all .2s ease-in-out;
    }
    .btn-music:hover {
        transform: translate(-50%, -50%) scale(110%);
    }
    .play {
        background-image: ${sWPlay};
    }
    .pause {
        background-image: ${sWPause};
    }
    /* Многоточие */
    .multipoint {
        opacity: 1;
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--br-xl);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(https://static.tildacdn.com/tild3734-3864-4533-b633-353635613339/icons8-dots_loading.svg);
    }
    .multipoint:hover {
        background-color: rgba(255,255,255,.5);
        border-radius: var(--br-xl);
    }
    /* Input громкости и прогресса песни */
    ${playerID} .music-range.volume,
    ${playerID} .music-range.progress {
        --gradient: linear-gradient(90deg, ${sTSClrE} 0%, ${sTSClrE} 100%, ${sTSClrS} 100%, ${sTSClrS} 100%)
        height:8px;
        border-radius: ${sTSBrdRd};
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;
    }
    ${playerID} .music-range:focus {
        outline: none;
    }
    ${playerID} .music-range::-webkit-slider-runnable-track {
        width: 100%;
        height:8px;
        cursor: pointer;
        animate: 0.2s;
        background: var(--gradient);
        border-radius: ${sTSBrdRd};
    }
    ${playerID} .music-range::-webkit-slider-runnable-track:after {
        width: 100%;
        height: 4px;
        cursor: pointer;
        animate: 0.2s;
        background: var(--gradient);
        border-radius: ${sTSBrdRd};
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range::-webkit-slider-thumb {
        height: 20px;
        width: 20px;
        border-radius: ${sTTBrdRd};
        background: ${sTTClr};
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -6px;
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range:focus::-webkit-slider-runnable-track {
        background: var(--gradient);
    }
    ${playerID} .music-range::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        animate: 0.2s;
        background: var(--gradient);
        border-radius: ${sTSBrdRd};
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: ${sTTBrdRd};
        background: ${sTTClr};
        cursor: pointer;
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range::-ms-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    ${playerID} .music-range::-ms-fill-lower {
        background: ${sTSClrE};
        border-radius: 4px;
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range::-ms-fill-upper {
        background: ${sTSClrS};
        border-radius: 4px;
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range::-ms-thumb {
        margin-top: 1px;
        height: 20px;
        width: 20px;
        border-radius: ${sTTBrdRd};
        background: ${sTTClr};
        cursor: pointer;
        border: none;
        box-shadow: none;
    }
    ${playerID} .music-range:focus::-ms-fill-lower {
        background: ${sTSClrE};
    }
    ${playerID} .music-range:focus::-ms-fill-upper {
        background: ${sTSClrS};
    }
`;
document.head.appendChild(stylePlayer);
