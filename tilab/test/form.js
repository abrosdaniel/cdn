/*
 * Abros Tilda Form v1.0
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
    div.className = "atf-popup";
    div.innerHTML = `
<!-- ATF001 -->
<div class="atf001">
  <div class="popup" style="display: none">
    <div class="popup_container" style="opacity: 0"></div>
    <div class="popup_close" style="opacity: 0">
      <svg role="presentation" class="t-popup__close-icon" width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="#1d1d1d" fill-rule="evenodd"> <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect> <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect> </g> </svg>
    </div>
    <div class="popup_bg" style="opacity: 0"></div>
  </div>
</div>
<style>
  .atf001 .popup {
    position: fixed;
    inset: 0;
    z-index: 999;
  }
  .atf001 .popup_container {
    -webkit-transition: opacity ease-in-out 0.3s;
    -moz-transition: opacity ease-in-out 0.3s;
    -o-transition: opacity ease-in-out 0.3s;
    transition: opacity ease-in-out 0.3s;
    transform: translateY(50%);
    z-index: 6;
    position: relative;
  }
  .atf001 .popup_close {
    position: fixed;
    right: 20px;
    top: 20px;
    width: 23px;
    height: 23px;
    cursor: pointer;
    -webkit-transition: opacity ease-in-out 0.3s;
    -moz-transition: opacity ease-in-out 0.3s;
    -o-transition: opacity ease-in-out 0.3s;
    transition: opacity ease-in-out 0.3s;
    z-index: 9;
  }
  .atf001 .popup_bg {
    -webkit-transition: opacity ease-in-out 0.3s;
    -moz-transition: opacity ease-in-out 0.3s;
    -o-transition: opacity ease-in-out 0.3s;
    transition: opacity ease-in-out 0.3s;
    cursor: pointer;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    position: fixed;
    inset: 0;
    z-index: 3;
  }
</style>
    `;
    allrecords.appendChild(div);
    const block = allrecords.querySelector(`#${this.settings.name}`);
    const container = block.querySelector(".popup_container");
    Object.entries(this.scheme).forEach(([formName, formConfig]) => {
      const formElement = document.querySelector(formConfig.target);
      container.appendChild(formElement);
    });
    const popupClose = block.querySelector(".popup_close");
    const popupBg = block.querySelector(".popup_bg");
    if (popupClose) {
      popupClose.addEventListener("click", () =>
        this.hidePopup(block.querySelector(".popup"))
      );
    }
    if (popupBg) {
      popupBg.addEventListener("click", () =>
        this.hidePopup(block.querySelector(".popup"))
      );
    }
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

    if (this.settings.type?.window === "popup" && this.settings.popup.url) {
      const popupButton = document.querySelector(
        `[href="${this.settings.popup.url}"]`
      );
      if (popupButton) {
        popupButton.addEventListener("click", () => {
          const block = document.querySelector(`#${this.settings.name}`);
          if (block) {
            this.showPopup(block.querySelector(".popup"));
          }
        });
      }
    }

    bindButton(form.prev?.target, () =>
      this.handleFormPrev(formTarget, formName, form.prev?.select)
    );
    bindButton(form.next?.target, () =>
      this.handleFormNext(formTarget, formName, form.next?.select)
    );
    bindButton(form.submit?.target, () => this.handleSubmit());
  }

  handleFormPrev(formTarget, formName, targetForm) {
    const formElement = formTarget.querySelector("form");
    if (formElement) {
      this.updateFormData(formElement, formName);
    }
    if (targetForm) {
      this.setForm(targetForm);
    }
  }

  handleFormNext(formTarget, formName, selectConfig) {
    const formElement = formTarget.querySelector("form");
    if (formElement) {
      const validationErrors = window.tildaForm.validate(formElement);
      if (validationErrors.length > 0) {
        window.tildaForm.showErrors(formElement, validationErrors);
        console.warn(`Ошибки валидации в форме ${formName}:`, validationErrors);
        return;
      }
      this.updateFormData(formElement, formName);
      if (Array.isArray(selectConfig)) {
        const formData = this.formData[formName];
        if (!formData) {
          console.warn(`Данные формы ${formName} отсутствуют.`);
          return;
        }
        const nextForm = selectConfig.find(
          (config) => formData[config.key] === config.value
        );
        if (nextForm) {
          window.tildaForm.hideErrors(formElement);
          this.setForm(nextForm.form);
        } else {
          const invalidValue =
            formData[selectConfig[0].key] || "неизвестное значение";
          const field = formElement?.querySelector(
            `[name="${selectConfig[0].key}"]`
          );
          const fieldContainer = field.closest(".t-input-block");
          const errorMessage = `Значение "${invalidValue}" не верно.`;
          var errorElement = fieldContainer.querySelector(".atf-input-error");
          if (!errorElement) {
            var errorElement = document.createElement("div");
            errorElement.className = "atf-input-error";
            errorElement.innerHTML = `
<p class="atf-input-error-text"></p>
<style>
  .atf-input-error {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.2);
    left: 0;
    margin-top: 5px;
    padding: 8px 10px;
    position: absolute;
    z-index: 2;
    transition: opacity 0.3s ease-in-out;
  }
  .atf-input-error-text {
    color: red;
    font-size: 13px;
  }
  .atf-input-error:after {
    border: 6px solid transparent;
    border-bottom-color: #fff;
    content: "";
    height: 0;
    left: 15%;
    position: absolute;
    top: -12px;
    width: 0;
  }
</style>
            `;
            fieldContainer.appendChild(errorElement);
          }
          const errorText = errorElement.querySelector(".atf-input-error-text");
          errorText.innerHTML = errorMessage;
          errorElement.style.opacity = "1";
          setTimeout(() => {
            errorElement.style.opacity = "0";
          }, 3000);
        }
      } else if (typeof selectConfig === "string") {
        window.tildaForm.hideErrors(formElement);
        this.setForm(selectConfig);
      }
    }
  }

  handleSubmit() {
    let isValid = true;
    Object.entries(this.scheme).forEach(([name, form]) => {
      const formElement = document
        .querySelector(form.target)
        ?.querySelector("form");
      if (formElement) {
        const validationErrors = window.tildaForm.validate(formElement);
        if (validationErrors.length > 0) {
          window.tildaForm.showErrors(formElement, validationErrors);
          console.warn(`Ошибки валидации в форме ${name}:`, validationErrors);
          isValid = false;
        } else {
          this.updateFormData(formElement, name);
        }
      }
    });

    if (isValid) {
      console.log("Все формы валидны. Данные для отправки:", this.formData);
      const dataContainer = document.querySelector(this.settings.data);
      if (dataContainer) {
        const formElement = dataContainer.querySelector("form");
        const formBtnSubmit = formElement.querySelector(".t-submit");
        if (formElement) {
          t_onFuncLoad("t_forms__getFormDataJSON", () => {
            let formDataJSON = t_forms__getFormDataJSON(formElement) || {};
            Object.keys(formDataJSON).forEach((key) => {
              delete formDataJSON[key];
            });
            Object.entries(this.formData).forEach(([formName, formData]) => {
              Object.entries(formData).forEach(([key, value]) => {
                formDataJSON[key] = value;
              });
            });
            console.log("Обновлённые данные формы для отправки:", formDataJSON);
            t_onFuncLoad("tildaForm", () => {
              window.tildaForm.send(formElement, formBtnSubmit, () => {
                console.log("Данные успешно отправлены!");
              });
            });
          });
        } else {
          console.warn("Форма для отправки не найдена.");
        }
      } else {
        console.warn("Контейнер данных не найден.");
      }
    } else {
      console.warn("Отправка формы прервана из-за ошибок валидации.");
    }
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
      const observer = new MutationObserver(() => {
        const formElement = container.querySelector("form");
        if (formElement) {
          observer.disconnect();
          formElement.updateFormData = () =>
            this.updateFormData(formElement, formName);
          const stateBtnSubmit = formElement.querySelector(".t-submit");
          if (stateBtnSubmit) {
            stateBtnSubmit.remove();
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
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

  showPopup(popup) {
    window.tildaForm.lockBodyScroll();
    popup.style.display = "block";
    setTimeout(() => {
      const popupContainer = popup.querySelector(".popup_container");
      const popupBg = popup.querySelector(".popup_bg");
      const popupClose = popup.querySelector(".popup_close");
      popupContainer.style.opacity = "1";
      popupBg.style.opacity = "1";
      popupClose.style.opacity = "1";
    }, 100);
  }

  hidePopup(popup) {
    window.tildaForm.unlockBodyScroll();
    const popupContainer = popup.querySelector(".popup_container");
    const popupBg = popup.querySelector(".popup_bg");
    const popupClose = popup.querySelector(".popup_close");
    popupContainer.style.opacity = "0";
    popupBg.style.opacity = "0";
    popupClose.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }
}
