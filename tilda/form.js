/*!
 * Tilda Custom Form.js v1.0
 * (c) 2025
 * by Daniel Abros
 * Сайт → https://abrosdaniel.com
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
    Object.entries(this.scheme).forEach(([formName, form]) => {
      if (this.settings.type?.window === "popup") {
        this.moveFormsToParent(formName, form);
      }
      this.bindFormButtons(formName, form);
    });
  }

  moveFormsToParent(formName, form) {
    const form1Container = document.querySelector(this.scheme.form_1.target);
    if (form1Container && formName !== "form_1") {
      const form1Parent = form1Container.parentNode;

      t_onFuncLoad("initForms", () => {
        const formTarget = document.querySelector(form.target);
        if (formTarget) {
          console.log(
            `Перемещаем ${form.target} в родителя ${this.scheme.form_1.target}`
          );
          form1Parent.appendChild(formTarget);
        }
      });
    }
  }

  bindFormButtons(formName, form) {
    const formTarget = document.querySelector(form.target);
    if (!formTarget) return;

    const bindButton = (buttonSelector, callback) => {
      const button = formTarget.querySelector(buttonSelector);
      if (button) {
        button.addEventListener("click", callback);
      }
    };

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
