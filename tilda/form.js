/*!
 * Form.js v1.0
 * (c) 2025
 * by Daniel Abros
 * Сайт → https://abrosdaniel.com
 * Telegram → https://t.me/abrosdaniel
 */

class AbrosTiForm {
  constructor(options = {}) {
    this.settings = options.settings || {};
    this.scheme = options.scheme || {};
    this.currentStep = null;
    this.formData = {};
    this.init();
  }

  init() {
    console.log("Инициализация формы...");
    const firstStep = Object.keys(this.scheme)[0];
    if (firstStep) {
      this.setStep(firstStep);
    }
    this.initSteps();
    this.initFormTracking(); // Вызов отслеживания данных формы
  }

  initSteps() {
    console.log("Инициализация шагов...");
    Object.keys(this.scheme).forEach((stepName) => {
      const step = this.scheme[stepName];
      console.log(`Обработка шага: ${stepName}`);

      if (step.next && step.next.target) {
        const nextButton = document.querySelector(step.next.target);
        if (nextButton) {
          console.log(`Добавлен обработчик "Next" для шага: ${stepName}`);
          nextButton.addEventListener("click", () => {
            console.log(`Переход на следующий шаг: ${step.next.form}`);
            this.setStep(step.next.form);
          });
        }
      }

      if (step.prev && step.prev.target) {
        const prevButton = document.querySelector(step.prev.target);
        if (prevButton) {
          console.log(`Добавлен обработчик "Prev" для шага: ${stepName}`);
          prevButton.addEventListener("click", () => {
            console.log(`Переход на предыдущий шаг: ${step.prev.form}`);
            this.setStep(step.prev.form);
          });
        }
      }

      if (step.submit && step.submit.target) {
        const submitButton = document.querySelector(step.submit.target);
        if (submitButton) {
          console.log(`Добавлен обработчик "Submit" для шага: ${stepName}`);
          submitButton.addEventListener("click", () => {
            console.log("Попытка отправки формы...");
            this.submitForm(step.submit);
          });
        }
      }
    });
  }

  initFormTracking() {
    console.log("Инициализация отслеживания данных формы...");
    const formSelectors = Object.values(this.scheme).map((step) => step.target);
    const forms = formSelectors.map((selector) =>
      document.querySelector(`${selector} form`)
    );

    const formDataObject = {};

    forms.forEach((formElement) => {
      if (!formElement) return;

      const formData = new FormData(formElement);
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const inputs = formElement.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.addEventListener("input", (event) => {
          const { name, value } = event.target;
          if (name) {
            this.proxyFormData[name] = value;
          }
        });
      });
    });

    this.proxyFormData = new Proxy(formDataObject, {
      set: (target, key, value) => {
        target[key] = value;
        this.formData[key] = value;
        console.log(`Обновлено поле "${key}": ${value}`);
        return true;
      },
    });

    this.formData = formDataObject;

    // Делаем данные формы глобально доступными
    if (!window.AbrosTiForm) {
      window.AbrosTiForm = {};
    }
    window.AbrosTiForm[this.settings.name] = this.formData;

    console.log("Данные формы инициализированы:", this.formData);
  }

  setStep(stepName) {
    console.log(`Переход на шаг: ${stepName}`);
    if (!this.scheme[stepName]) {
      console.error(`Шаг ${stepName} не найден в схеме`);
      return;
    }

    Object.keys(this.scheme).forEach((step) => {
      const target = this.scheme[step].target;
      if (target) {
        const element = document.querySelector(target);
        if (element) {
          element.style.display = "none";
        }
      }
    });

    const currentTarget = this.scheme[stepName].target;
    if (currentTarget) {
      const currentElement = document.querySelector(currentTarget);
      if (currentElement) {
        currentElement.style.display = "block";
      }
    }

    if (this.scheme[stepName].function) {
      console.log(`Выполнение функции для шага: ${stepName}`);
      this.scheme[stepName].function();
    }

    this.currentStep = stepName;
    console.log(`Текущий шаг обновлен: ${this.currentStep}`);
  }

  submitForm(submitConfig) {
    if (!submitConfig) return;

    console.log("Отправка формы с данными:", this.formData);

    if (submitConfig.form) {
      const resultForm = document.querySelector(submitConfig.form);
      if (resultForm) {
        resultForm.style.display = "block";
      }
    }
  }
}
