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
    this.data = {};
    this.init();
  }

  init() {
    const firstStep = Object.keys(this.scheme)[0];
    if (firstStep) {
      this.setStep(firstStep);
    }
    this.initSteps();
  }

  initSteps() {
    Object.keys(this.scheme).forEach((stepName) => {
      const step = this.scheme[stepName];

      if (step.next && step.next.target) {
        const nextButton = document.querySelector(step.next.target);
        if (nextButton) {
          nextButton.addEventListener("click", () => {
            this.setStep(step.next.form);
          });
        }
      }

      if (step.prev && step.prev.target) {
        const prevButton = document.querySelector(step.prev.target);
        if (prevButton) {
          prevButton.addEventListener("click", () => {
            this.setStep(step.prev.form);
          });
        }
      }

      if (step.submit && step.submit.target) {
        const submitButton = document.querySelector(step.submit.target);
        if (submitButton) {
          submitButton.addEventListener("click", () => {
            this.submitForm(step.submit);
          });
        }
      }
    });
  }

  initFormTracking() {
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
        return true;
      },
    });

    Object.assign(this.formData, formDataObject);

    if (!window.AbrosTiForm) {
      window.AbrosTiForm = {};
    }
    window.AbrosTiForm[this.settings.name] = this.formData;
  }

  setStep(stepName) {
    if (!this.scheme[stepName]) return;

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
      this.scheme[stepName].function();
    }

    this.currentStep = stepName;
  }

  submitForm(submitConfig) {
    if (!submitConfig) return;

    console.log("Отправка формы:", this.formData);

    if (submitConfig.form) {
      const resultForm = document.querySelector(submitConfig.form);
      if (resultForm) {
        resultForm.style.display = "block";
      }
    }
  }
}
