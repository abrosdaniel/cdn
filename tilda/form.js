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
  <div class="popup">
    <div class="popup_container"></div>
    <div class="popup_close"></div>
  </div>
  <div class="popup_bg"></div>
</div>
<style>
    ${this.settings.popup.style}
</style>
    `;
    allrecords.appendChild(div);
    const popup = allrecords.querySelector(`#${this.settings.name}`);
    const container = popup.querySelector(".popup_container");
    Object.entries(this.scheme).forEach(([formName, formConfig]) => {
      const formElement = document.querySelector(formConfig.target);
      container.appendChild(formElement);
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

    if (this.settings.type?.window === "popup" && this.settings.popup.url) {
      const popupButton = document.querySelector(
        `[href="${this.settings.popup.url}"]`
      );
      if (popupButton) {
        popupButton.addEventListener("click", () => {
          const popup = document.querySelector(`#${this.settings.name}`);
          if (popup) {
            showPopup(popup.querySelector(".atf001"));
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

  handleFormNext(formTarget, formName, targetForm) {
    const formElement = formTarget.querySelector("form");
    if (formElement) {
      const validationErrors = window.tildaForm.validate(formElement);
      if (validationErrors.length > 0) {
        window.tildaForm.showErrors(formElement, validationErrors);
        console.warn(`Ошибки валидации в форме ${formName}:`, validationErrors);
        return;
      }
      this.updateFormData(formElement, formName);
    }

    if (targetForm) {
      this.setForm(targetForm);
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
