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
      `%c📋 AbrosTiForm %cБиблиотека для создания кастомных форм в Tilda`,
      "background: #5292c9; color: white; border-radius: 5px; padding: 4px;",
      ""
    );
    console.groupCollapsed(`📖 Инструкция`);
    console.log(
      `1. Добавляете формы в Tilda (Поддерживаются как стандартные так и в ZeroBlock).\n
      2. Добавляете кнопки "Вперед", "Назад" и "Отправить" если требуются (Кнопки для каждой формы свои).\n
      3. У всех полей формы указываете уникальные Variable name/Имя переменной.\n
      4. Добавляете блок BF204N. В настройках блока подключить сервис куда будут отправляться данные. Поля можно удалить\n
      5. После всех форм ниже добавляете T123 и вставляете код:\n\n
        <script>\n
        const form = new AbrosTiForm({\n
          settings: {\n
            name: "Name",\n
            type: {\n
              window: "popup", // popup или default\n
              form: "quiz", // quiz или default\n
            },\n
          },\n
          scheme: {\n
            form_1: {\n
              target: ".uc_form_1",\n
              next: {\n
                target: ".uc_form_1 .t-next",\n
                select: "form_2",\n
              },\n
            },\n
            form_2: {\n
              target: ".uc_form_2",\n
              prev: {\n
                target: ".uc_form_2 .t-prev",\n
                select: "form_1",\n
              },\n
              submit: {\n
                target: ".uc_form_2 .t-submit",\n
                select: ".t123__result_form",\n
              },\n
            },\n
          },\n
        });\n
        </script>\n\n
        6. В коде нужно настроить settings.\n
           name - Название создаваемой формы.\n
           window - Тип отображения (popup - открытие формы в popup или default - блоком на странице).\n
           form - Тип формы (quiz - каждая форма это каждый шаг или default - распологаются так как в макете).\n
        7. В коде нужно настроить scheme. Каждый form_№ это каждая ваша форма. Добавляются через запятую. Макет формы:\n\n
        form_1: { - Имя формы формируется из form_ и порядка формы.\n
              target: ".uc_form_1", - Класс/ID блока с формой.\n
              function: () => {}, - Функция которая будет выполнена при активности формы.\n
              next: { - Кнопка "Вперед". Если требуется.\n
                target: ".uc_form_1 .t-next", - Класс/ID кнопки.\n
                select: "form_2", - Имя формы на которую будет переход.\n
              },\n
              prev: { - Кнопка "Назад". Если требуется.\n
                target: ".uc_form_1 .t-prev", - Класс/ID кнопки.\n
                select: "form_1", - Имя формы на которую будет переход.\n
              },\n
              submit: { - Кнопка "Отправить". Если требуется.\n
                target: ".uc_form_2 .t-submit", - Класс/ID кнопки.\n
                select: ".uc_BF204N", - Класс/ID блока BF204N.\n
              },\n
            },\n\n
        `
    );
    console.groupEnd();
    console.groupCollapsed(`📚 Документация`);
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
      const button = document.querySelector(buttonSelector);
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
          const stateBtnSubmit = formElement.querySelector(".t-submit");
          if (stateBtnSubmit) {
            stateBtnSubmit.style.display = "none !important";
          }
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
