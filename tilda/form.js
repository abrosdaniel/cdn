/*
 * Tilda Custom Form.js v1.0
 * (c) 2025
 * by Daniel Abros
 * Site → https://abrosdaniel.com
 * Telegram → https://t.me/abrosdaniel
 */

class AbrosTiForm {
  constructor(options = {}) {
    this.settings = options.settings || {};
    this.scheme = options.scheme || {};
    this.currentForm = null;
    if (!window.AbrosTiForm) {
      window.AbrosTiForm = {};
    }
    if (!window.AbrosTiForm[this.settings.name]) {
      window.AbrosTiForm[this.settings.name] = {};
    }
    this.formData = window.AbrosTiForm[this.settings.name];
    this.init();
    console.log(`Создание формы ${this.settings.name} завершено.`);
    console.groupCollapsed(
      `%c📋 AbrosTiForm%c Библиотека для создания кастомных форм в Tilda`,
      "background:rgb(164, 114, 94); color: white; border-radius: 5px; padding: 4px;",
      ""
    );
    console.groupCollapsed(`📚 Документация`);
    console.log(`Скоро появится документация по использованию библиотеки.`);
    console.groupEnd();
    console.log(`📦 Версия библиотеки: 1.0`);
    console.log(
      `✨ Данная библиотека является полностью бесплатной. Указание автора не обязательно.`
    );
    console.groupCollapsed(
      `%c👨🏻‍💻 Development by Daniel Abros`,
      "border: 1px solid; border-radius: 5px; padding: 4px;"
    );
    console.log(`💻 Site → https://abrosdaniel.com`);
    console.groupEnd();
    console.groupEnd();
  }

  init() {
    if (this.settings.type?.window === "popup") {
      this.settings.type.form = "quiz";
    }
    const firstForm = Object.keys(this.scheme)[0];
    if (firstForm) {
      this.setForm(firstForm);
    }
    this.initForms();
    this.initFormTracking();
  }

  initForms() {
    if (this.settings.type?.window === "popup") {
      this.moveFormsToPopup();
    }
    Object.entries(this.scheme).forEach(([formName, form]) => {
      this.bindFormButtons(formName, form);
    });
  }

  moveFormsToPopup() {
    const allrecords = document.querySelector("#allrecords");
    const div = document.createElement("div");
    div.id = this.settings.name;
    div.innerHTML = `
  <!-- ATF001 -->
  <div class="atf001 t1093">
    <div
      class="t-popup t-popup-anim-fadein t-popup-transition"
      data-anim="fadein"
      data-anim-timeout="0.3"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      style="display: none"
    >
      <div
        class="t-popup__container t-width t-valign_middle t-popup__container-animated"
      >
      </div>
      <div class="t-popup__close t-popup__block-close">
        <button
          type="button"
          class="t-popup__close-wrapper t-popup__block-close-button"
          aria-label="Закрыть диалоговое окно"
        >
          <svg
            role="presentation"
            class="t-popup__close-icon"
            width="23px"
            height="23px"
            viewBox="0 0 23 23"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              stroke="none"
              stroke-width="1"
              fill="#1d1d1d"
              fill-rule="evenodd"
            >
              <rect
                transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) "
                x="10.3137085"
                y="-3.6862915"
                width="2"
                height="30"
              ></rect>
              <rect
                transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) "
                x="10.3137085"
                y="-3.6862915"
                width="2"
                height="30"
              ></rect>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div class="t-popup__bg t-popup__bg-active"></div>
  </div>
  <style>
    .atf001 .t-popup__bg {
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }
    .atf001 .t-popup.t-popup-anim-fadein .t-popup__container {
      transition-timing-function: ease-in-out;
    }
  </style>
</div>
    `;
    allrecords.appendChild(div);
    const popup = allrecords.querySelector(`#${this.settings.name}`);
    const container = popup.querySelector(".t-popup__container");
    Object.entries(this.scheme).forEach(([formName, formConfig]) => {
      const formElement = document.querySelector(formConfig.target);
      container.appendChild(formElement);
    });
    t_onFuncLoad("t_popup__trapFocus", function () {
      t_onFuncLoad("t_popup__closePopup", function () {
        t_onFuncLoad("t_popup__showPopup", function () {
          const popupElement = popup.querySelector(".t-popup");
          const closeButton = popup.querySelector(".t-popup__close");
          const bgElement = popup.querySelector(".t-popup__bg");
          if (popupElement) {
            t_popup__trapFocus(popupElement);
            if (closeButton) {
              closeButton.addEventListener("click", () =>
                t_popup__closePopup(popupElement)
              );
            }
            if (bgElement) {
              bgElement.addEventListener("click", () =>
                t_popup__closePopup(popupElement)
              );
            }
          }
        });
      });
    });
  }

  bindFormButtons(formName, form) {
    const formTarget = document.querySelector(form.target);
    if (!formTarget) return;

    const bindButton = (buttonSelector, callback) => {
      const button = document.querySelector(buttonSelector);
      if (button) {
        button.addEventListener("click", callback);
      }
    };

    if (this.settings.type?.window === "popup" && this.settings.url_popup) {
      const popupButton = document.querySelector(
        `[href="${this.settings.url_popup}"]`
      );
      if (popupButton) {
        popupButton.addEventListener("click", () => {
          const popup = document.querySelector(`#${this.settings.name}`);
          if (popup) {
            t_popup__showPopup(popup.querySelector(".t-popup"));
          }
        });
      }
    }

    bindButton(form.next?.target, () =>
      this.handleFormChange(formTarget, formName, form.next?.select)
    );
    bindButton(form.prev?.target, () =>
      this.handleFormChange(formTarget, formName, form.prev?.select)
    );
    bindButton(form.submit?.target, () =>
      this.handleSubmit(formTarget, formName, form.submit)
    );
  }

  handleFormChange(formTarget, formName, targetForm) {
    const formElement = formTarget.querySelector("form");
    if (formElement) {
      this.updateFormData(formElement, formName);
    }
    if (targetForm) {
      this.setForm(targetForm);
    }
  }

  handleSubmit(formTarget, formName, submitConfig) {
    const formElement = formTarget.querySelector("form");
    if (formElement) {
      this.updateFormData(formElement, formName);
    }
    this.submitForm(submitConfig);
  }

  initFormTracking() {
    const formSelectors = Object.entries(this.scheme).map(
      ([formName, form]) => ({ selector: form.target, formName })
    );

    formSelectors.forEach(({ selector, formName }) => {
      const container = document.querySelector(selector);
      if (!container) {
        console.warn(`Блок с классом или ID: ${selector} - не найден.`);
        return;
      }

      t_onFuncLoad("initForms", () => {
        const formElement = container.querySelector("form");
        if (formElement) {
          formElement.updateFormData = () =>
            this.updateFormData(formElement, formName);
          const stateBtnSubmit = formElement.querySelector(".t-submit");
          if (stateBtnSubmit) {
            stateBtnSubmit.style.display = "none";
          }
        } else {
          console.warn(`Форма внутри блока ${selector} - не найдена.`);
        }
      });
    });
  }

  updateFormData(formElement, formName) {
    t_onFuncLoad("t_forms__getFormDataJSON", () => {
      const formDataJSON = t_forms__getFormDataJSON(formElement) || {};
      if (!this.formData[formName]) {
        this.formData[formName] = {};
      }
      const currentFormData = this.formData[formName];

      Object.keys(currentFormData).forEach((key) => {
        if (!(key in formDataJSON)) {
          delete currentFormData[key];
        }
      });

      Object.entries(formDataJSON).forEach(([key, value]) => {
        if (
          key !== "tildaspec-elemid" &&
          key !== "form-spec-comments" &&
          key !== "tildaspec-phone-part" &&
          key !== "tildaspec-phone-part-iso"
        ) {
          currentFormData[key] = value;
        }
      });

      console.log("Обновлённые данные формы:", this.formData);
    });
  }

  setForm(formName) {
    if (!this.scheme[formName]) {
      console.error(`Шаг ${formName} не найден в схеме`);
      return;
    }
    const isDefaultForm = this.settings.type?.form === "default";

    Object.entries(this.scheme).forEach(([name, form]) => {
      const element = document.querySelector(form.target);
      if (element) {
        element.style.display =
          isDefaultForm || name === formName ? "block" : "none";
      }
    });

    if (this.scheme[formName]?.function) {
      this.scheme[formName].function();
    }

    this.currentForm = formName;
  }

  submitForm(submitConfig) {
    if (!submitConfig) return;

    console.log("Отправка формы с данными:", this.formData);

    if (submitConfig.form) {
      const resultForm = document.querySelector(submitConfig.select);
      if (resultForm) {
        resultForm.style.display = "block";
      }
    }
  }
}
