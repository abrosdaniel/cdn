/*!
 * Guard.js v0.0
 * (c) 2023-2025
 * by Daniel Abros
 * Сайт → https://abrosdaniel.com
 * Telegram → https://t.me/abrosdaniel
 * <script src="https://cdn.abros.dev/lib/guard.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/lib/guard.js"></script>
 */

class AbrosGuard {
  constructor(options = {}) {
    this.host = options.host || null;
    this.notClick = options.notClick || null;
    this.keylogger = options.keylogger || null;
    this.blocker = options.blocker || null;
    this.init();
  }

  init() {
    if (this.notClick) {
      this.initNotClick(this.notClick);
    }
    if (this.keylogger) {
      this.initKeylogger(this.keylogger);
    }
    if (this.blocker) {
      this.initBlocker(this.blocker, this.host);
    }
  }

  // Функция для обработки запрета кликов
  initNotClick(options) {
    const { right } = options;
    document.addEventListener("contextmenu", (event) => {
      const target = event.target;
      if (
        right &&
        right.some((className) => target.classList.contains(className))
      ) {
        event.preventDefault();
        console.warn("Right-click is disabled on this element.");
      }
    });
  }

  // Функция для логирования клавиш
  initKeylogger(options) {
    const { image, trigger } = options;
    let canvas;
    let ctx;
    let particles = [];
    let animationStarted = false;
    const img = new Image();
    img.src = image;
    let pressedKeys = "";

    this.handleKeyDown = (event) => {
      const keyPressed = event.key.toUpperCase();
      pressedKeys += keyPressed;

      if (pressedKeys.includes(trigger) && !animationStarted) {
        if (!canvas) {
          this.createCanvas();
        }
        this.launchFirework();
        pressedKeys = "";
      }
    };

    this.createCanvas = () => {
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "999999999";
      document.documentElement.appendChild(canvas);
      ctx = canvas.getContext("2d");
    };

    this.launchFirework = () => {
      animationStarted = true;
      for (let i = 0; i < 100; i++) {
        particles.push(this.createParticle());
      }
      this.animateFirework();
    };

    this.createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const speed = {
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * -6,
      };
      const size = Math.random() * 30 + 20;
      return { x, y, speed, size };
    };

    this.animateFirework = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.x += particle.speed.x;
        particle.y += particle.speed.y;
        particle.size -= 0.1;
        ctx.drawImage(
          img,
          particle.x,
          particle.y,
          particle.size,
          particle.size
        );
        if (particle.size <= 0 || particle.y > canvas.height) {
          particles.splice(index, 1);
        }
      });
      if (particles.length > 0) {
        requestAnimationFrame(this.animateFirework);
      } else {
        animationStarted = false;
      }
    };
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  // Функция для блокировки
  initBlocker(options, host) {
    if (window.location.host !== host) {
      if (options === "redirect") {
        window.location.href = `https://${host}`;
      } else if (blockerOption === "alert") {
        alert("Access blocked!");
      } else if (blockerOption === "console") {
        console.error("Access blocked!");
      }
    }
  }
}

if (typeof window !== "undefined") {
  window.AbrosGuard = AbrosGuard;
}
