const AudioPlayer = (function () {
  function init(settings) {
    const player = {};

    player.settings = settings;

    player.initStyles = function () {
      const stylePlayer = document.createElement("style");
      stylePlayer.textContent = `
              ${this.settings.areaID} {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 80px;
                  z-index: 90;
              }
              ${this.settings.playerID} {
                  position: fixed;
                  bottom: -85px;
                  left: 0;
                  width: 100%;
                  z-index: 100;
                  transition: bottom .2s ease-in-out;
              }
              ${this.settings.playerID}.show {
                  bottom: 0px;
              }
              .play-wrapper {
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 1;
                  width: 100%;
                  height: 100%;
                  background-color: ${this.settings.styles.wrapper.backgroundColor};
                  border-radius: ${this.settings.styles.wrapper.borderRadius};
              }
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
                  background-image: ${this.settings.styles.wrapper.icons.play};
              }
              .pause {
                  background-image: ${this.settings.styles.wrapper.icons.pause};
              }
              ${this.settings.playerID} .music-range.volume,
              ${this.settings.playerID} .music-range.progress {
                  --gradient: linear-gradient(90deg, ${this.settings.styles.trackSlide.colorEnd} 0%, ${this.settings.styles.trackSlide.colorEnd} 100%, ${this.settings.styles.trackSlide.colorStart} 100%)
                  height:8px;
                  border-radius: ${this.settings.styles.trackSlide.borderRadius};
                  -webkit-appearance: none;
                  margin: 10px 0;
                  width: 100%;
              }
              ${this.settings.playerID} .music-range:focus {
                  outline: none;
              }
              ${this.settings.playerID} .music-range::-webkit-slider-runnable-track {
                  width: 100%;
                  height:8px;
                  cursor: pointer;
                  animate: 0.2s;
                  background: var(--gradient);
                  border-radius: ${this.settings.styles.trackSlide.borderRadius};
              }
              ${this.settings.playerID} .music-range::-webkit-slider-thumb {
                  height: 20px;
                  width: 20px;
                  border-radius: ${this.settings.styles.trackSlide.thumbBorderRadius};
                  background: ${this.settings.styles.trackSlide.thumbColor};
                  cursor: pointer;
                  -webkit-appearance: none;
                  margin-top: -6px;
                  border: none;
                  box-shadow: none;
              }
          `;
      document.head.appendChild(stylePlayer);
    };

    player.initPlayer = function () {
      this.audio = document.querySelector(this.settings.audioID);
      this.player = document.querySelector(this.settings.playerID);
      this.volumeInput = this.player.querySelector('input[name="volume"]');
      this.progressInput = this.player.querySelector('input[name="progress"]');
      this.volumeInput.addEventListener("input", this.volumeControl.bind(this));
      this.progressInput.addEventListener(
        "input",
        this.progressListen.bind(this)
      );
      this.player.addEventListener("mouseenter", () => {
        this.onElement = true;
      });
      this.player.addEventListener("mouseleave", () => {
        this.onElement = false;
      });
    };

    player.initCatalog = function () {
      this.catalog = document.querySelector(this.settings.catalogID);
      this.storeGrid = this.catalog.querySelector(".js-store-grid-cont");
      this.storeGrid.addEventListener(
        "tStoreRendered",
        this.onStoreRendered.bind(this)
      );
    };

    player.onStoreRendered = function () {
      this.products = this.storeGrid.querySelectorAll(".js-product");
      this.productsArr = Array.from(this.products);
      this.idArr = this.productsArr.map(
        (product) => product.dataset.productGenUid
      );
      this.getProducts(this.idArr)
        .then((res) => {
          if (res) {
            this.playlist = res.sort(
              (a, b) => this.idArr.indexOf(a.uid) - this.idArr.indexOf(b.uid)
            );
            this.setupProductEvents();
          } else {
            console.error("Ошибка");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    player.setupProductEvents = function () {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.products.forEach((product) =>
          this.playPauseBtnOnProduct(null, product)
        );
        this.areaEnter();
      } else {
        this.products.forEach((product) => {
          const cover = product.querySelector(".js-product-img");
          cover.addEventListener("mouseenter", this.enter.bind(this));
          cover.addEventListener("mouseleave", this.leave.bind(this));
        });
        this.area.addEventListener("mouseenter", this.areaEnter.bind(this));
        this.area.addEventListener("mouseleave", this.areaLeave.bind(this));
      }
    };

    player.areaEnter = function () {
      this.player.classList.add("show");
    };

    player.areaLeave = function () {
      setTimeout(() => {
        this.isPlaying()
          ? false
          : this.onElement
          ? false
          : this.player.classList.remove("show");
      }, 1000);
    };

    player.volumeControl = function (e) {
      let per = e.target.value + "%";
      e.target.style.setProperty(
        "--gradient",
        `linear-gradient(90deg, ${this.settings.styles.trackSlide.colorEnd} 0%, ${this.settings.styles.trackSlide.colorEnd} ${per}, ${this.settings.styles.trackSlide.colorStart} ${per}, ${this.settings.styles.trackSlide.colorStart} 100%)`
      );
      this.audio.volume = Number(e.target.value) / 100;
    };

    player.progressListen = function (e) {
      e && e.target.value && this.audio.duration
        ? (this.audio.currentTime = Math.ceil(
            (Number(e.target.value) / 100) * this.audio.duration
          ))
        : false;
      this.audio.removeEventListener(
        "timeupdate",
        this.progressControl.bind(this)
      );
      this.audio.addEventListener(
        "timeupdate",
        this.progressControl.bind(this)
      );
    };

    player.progressControl = function () {
      let per =
        Math.ceil((this.audio.currentTime * 100) / this.audio.duration) || 0;
      this.progressInput.value = String(per);
      per += "%";
      this.progressInput.style.setProperty(
        "--gradient",
        `linear-gradient(90deg, ${this.settings.styles.trackSlide.colorEnd} 0%, ${this.settings.styles.trackSlide.colorEnd} ${per}, ${this.settings.styles.trackSlide.colorStart} ${per}, ${this.settings.styles.trackSlide.colorStart} 100%)`
      );
    };

    player.getProducts = function (idArr) {
      return new Promise((resolve, reject) => {
        let c = Date.now(),
          dataObj = {
            productsuid: idArr,
            c: c,
            projectid:
              document.getElementById("allrecords").dataset.tildaProjectId,
          };
        const apiUrl = `https://${
          window.t_store_endpoint || "store.tildacdn.com"
        }/api/getproductsbyuid/`;
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).products);
          } else {
            resolve(false);
          }
        };
        xhr.ontimeout = xhr.onerror = () => {
          console.error(
            "Can't get getproductsbyuid. Requesting idArr: " + idArr
          );
        };
        xhr.open("POST", apiUrl);
        xhr.timeout = 20000;
        xhr.send(JSON.stringify(dataObj));
      });
    };

    player.playPauseBtnOnProduct = function (e, product) {
      let pagination = this.catalog.querySelector(".t-store__pagination");
      let activePage = pagination ? Number(pagination.dataset.activePage) : 1;
      let trackNum =
        this.productsArr.indexOf(product) +
        (activePage - 1) * this.settings.cards;
      trackNum =
        trackNum < this.playlist.length
          ? trackNum
          : this.productsArr.indexOf(product);
      let track = trackNum !== -1 ? this.trackLink(this.playlist[trackNum]) : 0;
      let playWrapper = document.createElement("div");
      playWrapper.classList.add("play-wrapper");
      let playPauseBtn = document.createElement("div");
      playPauseBtn.classList.add("btn-music");
      this.isPlaying() && this.audio.src === track
        ? playPauseBtn.classList.add("pause")
        : playPauseBtn.classList.add("play");
      playWrapper.appendChild(playPauseBtn);
      e !== null
        ? e.target.appendChild(playWrapper)
        : product.querySelector(".js-product-img").appendChild(playWrapper);
      playPauseBtn.addEventListener("click", this.playPause.bind(this));
    };

    player.enter = function (e) {
      e.preventDefault();
      const product = e.target.closest(".js-product");
      this.playPauseBtnOnProduct(e, product);
    };

    player.leave = function (e) {
      e.preventDefault();
      e.target.replaceChildren();
    };

    player.playPause = function (e) {
      if (e.target.classList.contains("btn-music")) {
        e.preventDefault();
        const product = e.target.closest(".js-product");
        let pagination = this.catalog.querySelector(".t-store__pagination");
        let activePage = pagination ? Number(pagination.dataset.activePage) : 1;
        let trackNum =
          this.productsArr.indexOf(product) +
          (activePage - 1) * this.settings.cards;
        trackNum =
          trackNum < this.playlist.length
            ? trackNum
            : this.productsArr.indexOf(product);
        let track =
          trackNum !== -1
            ? this.trackLink(this.playlist[trackNum])
            : this.trackLink(this.playlist[0]);
        if (this.audio.src !== track) {
          for (let pauseBtn of this.storeGrid.querySelectorAll(
            ".btn-music.pause"
          )) {
            pauseBtn.classList.remove("pause");
            pauseBtn.classList.add("play");
          }
          e.target.classList.add("pause");
          this.audio.src = track;
        } else {
          e.target.classList.remove("play");
          e.target.classList.remove("pause");
          if (this.isPlaying()) {
            e.target.classList.add("play");
          } else {
            e.target.classList.add("pause");
          }
        }
      }
      if (this.audio.src === "") {
        let num = 0;
        this.audio.dataset.trackNumber = num;
        this.audio.src = this.trackLink(this.playlist[num]);
      } else {
        let num = this.playlist
          .map((obj) => this.trackLink(obj) === this.audio.src)
          .indexOf(true);
        this.audio.dataset.trackNumber = num;
      }
      this.isPlaying() ? this.audio.pause() : this.audio.play();
      let btnPlayImg = this.player.querySelector(".player-play .tn-atom img");
      btnPlayImg.src = this.isPlaying()
        ? `${this.settings.styles.player.icons.pause}`
        : `${this.settings.styles.player.icons.play}`;
      this.playerInfo();
    };

    player.isPlaying = function () {
      return !this.audio.paused;
    };

    player.nowPlaying = function () {
      return this.playlist[Number(this.audio.dataset.trackNumber)];
    };

    player.trackLink = function (product) {
      return product.characteristics.find((song) => song.title === "music")
        .value;
    };

    player.playerInfo = function () {
      const cover = this.player.querySelector(".player-cover .tn-atom");
      const title = this.player.querySelector(".player-title .tn-atom");
      const btnPrev = this.player.querySelector(".player-prev .tn-atom");
      const btnPlay = this.player.querySelector(".player-play .tn-atom");
      const btnNext = this.player.querySelector(".player-next .tn-atom");
      const btnBuy = this.player.querySelector(".player-btn-buy .tn-atom");
      const btnText = this.player.querySelector(".player-text .tn-atom");
      const btnVolume = this.player.querySelector(".player-volume .tn-atom");
      btnPlay.removeEventListener("click", this.playPause.bind(this));
      btnNext.removeEventListener("click", this.playNext.bind(this));
      btnPrev.removeEventListener("click", this.playPrev.bind(this));
      btnVolume.removeEventListener("click", this.volumeOnOff.bind(this));
      this.volumeInput.removeEventListener(
        "input",
        this.volumeControl.bind(this)
      );
      title.innerHTML = this.nowPlaying().title;
      cover.style.backgroundImage = `url(${
        JSON.parse(this.nowPlaying().gallery)[0].img
      })`;
      btnBuy.setAttribute("href", this.nowPlaying().url);
      btnText.setAttribute("href", this.nowPlaying().url);
      btnPlay.addEventListener("click", this.playPause.bind(this));
      btnNext.addEventListener("click", this.playNext.bind(this));
      btnPrev.addEventListener("click", this.playPrev.bind(this));
      btnVolume.addEventListener("click", this.volumeOnOff.bind(this));
      this.volumeInput.addEventListener("input", this.volumeControl.bind(this));
      this.volumeInput.dispatchEvent(new Event("input", { bubbles: true }));
      this.progressInput.addEventListener(
        "input",
        this.progressListen.bind(this)
      );
      this.progressInput.dispatchEvent(new Event("input", { bubbles: true }));
      this.player.classList.add("show");
      this.progressListen();
      this.autoplay();
    };

    player.autoplay = function () {
      this.audio.removeEventListener("ended", this.playNext.bind(this), false);
      this.audio.addEventListener("ended", this.playNext.bind(this), false);
    };

    player.playNext = function () {
      let numNow = Number(this.audio.dataset.trackNumber);
      let numNew = numNow + 1 < this.playlist.length ? numNow + 1 : 0;
      this.audio.src = this.trackLink(this.playlist[numNew]);
      this.audio.dataset.trackNumber = numNew;
      this.audio.play();
      this.playerInfo();
    };

    player.playPrev = function () {
      let numNow = Number(this.audio.dataset.trackNumber);
      let numNew = numNow - 1 > -1 ? numNow - 1 : this.playlist.length - 1;
      this.audio.src = this.trackLink(this.playlist[numNew]);
      this.audio.dataset.trackNumber = numNew;
      this.audio.play();
      this.playerInfo();
    };

    player.volumeOnOff = function () {
      this.audio.volume = this.audio.volume === 0 ? 1 : 0;
      let volume = this.player.querySelector(".player-volume img");
      if (this.audio.volume === 0) {
        volume.src = `${this.settings.styles.player.icons.volumeOff}`;
        this.volumeInput.value = "0";
        this.volumeInput.style.setProperty(
          "--gradient",
          `linear-gradient(90deg, ${this.settings.styles.trackSlide.colorStart} 0%, ${this.settings.styles.trackSlide.colorStart} 100%)`
        );
      } else {
        volume.src = `${this.settings.styles.player.icons.volumeOn}`;
        this.volumeInput.value = "100";
        this.volumeInput.style.setProperty(
          "--gradient",
          `linear-gradient(90deg, ${this.settings.styles.trackSlide.colorEnd} 0%, ${this.settings.styles.trackSlide.colorEnd} 100%)`
        );
      }
    };

    // Вызов методов инициализации
    player.initStyles();
    player.initPlayer();
    player.initCatalog();

    return player;
  }

  return { init };
})();
