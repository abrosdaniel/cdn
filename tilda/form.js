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
    this.currentStep = null;
    this.formData = {};
    this.init();
    console.log(`Создание формы ${this.settings.name} завершена.`);
  }

  init() {
    if (this.settings.type && this.settings.type.window === "popup") {
      this.settings.type.form = "quiz";
    }
    const firstStep = Object.keys(this.scheme)[0];
    if (firstStep) {
      this.setStep(firstStep);
    }
    this.initSteps();
    this.initFormTracking();
  }

  initSteps() {
    Object.keys(this.scheme).forEach((stepName) => {
      const step = this.scheme[stepName];

      if (this.settings.type && this.settings.type.window === "popup") {
        const step1Container = document.querySelector(
          this.scheme.step_1.target
        );

        if (step1Container && stepName !== "step_1") {
          const step1Parent = step1Container.parentNode;

          t_onFuncLoad("initForms", () => {
            const stepTarget = document.querySelector(step.target);
            if (stepTarget) {
              console.log(
                `Перемещаем ${step.target} в родителя ${this.scheme.step_1.target}`
              );
              step1Parent.appendChild(stepTarget);
            }
          });
        }
      }

      if (step.next && step.next.target) {
        const stepTarget = document.querySelector(step.target);
        const nextButton = stepTarget.querySelector(step.next.target);
        if (nextButton) {
          nextButton.addEventListener("click", () => {
            const formElement = stepTarget.querySelector("form");
            if (formElement && formElement.updateFormData) {
              formElement.updateFormData();
            }
            this.setStep(step.next.form);
          });
        }
      }

      if (step.prev && step.prev.target) {
        const stepTarget = document.querySelector(step.target);
        const prevButton = stepTarget.querySelector(step.prev.target);
        if (prevButton) {
          prevButton.addEventListener("click", () => {
            const formElement = stepTarget.querySelector("form");
            if (formElement && formElement.updateFormData) {
              formElement.updateFormData();
            }
            this.setStep(step.prev.form);
          });
        }
      }

      if (step.submit && step.submit.target) {
        const stepTarget = document.querySelector(step.target);
        const submitButton = stepTarget.querySelector(step.submit.target);
        if (submitButton) {
          submitButton.addEventListener("click", () => {
            const formElement = stepTarget.querySelector("form");
            if (formElement && formElement.updateFormData) {
              formElement.updateFormData();
            }
            this.submitForm(step.submit);
          });
        }
      }
    });
  }

  initFormTracking() {
    const formSelectors = Object.values(this.scheme).map((step) => step.target);
    formSelectors.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) {
        console.warn(`Блок с классом или ID: ${selector} - не найден.`);
        return;
      }

      t_onFuncLoad("initForms", () => {
        const formElement = container.querySelector("form");
        if (formElement) {
          this.trackForm(formElement);
        }
      });
    });
  }

  trackForm(formElement) {
    t_onFuncLoad("t_forms__getFormDataJSON", () => {
      const formName = this.settings.name;
      if (!window.AbrosTiForm) {
        window.AbrosTiForm = {};
      }
      if (!window.AbrosTiForm[formName]) {
        window.AbrosTiForm[formName] = {};
      }
      const updateFormData = () => {
        const formDataJSON = t_forms__getFormDataJSON(formElement) || {};
        const currentFormData = window.AbrosTiForm[formName];
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
      };
      updateFormData();
      formElement.updateFormData = updateFormData;
    });
  }

  setStep(stepName) {
    if (!this.scheme[stepName]) {
      console.error(`Шаг ${stepName} не найден в схеме`);
      return;
    }

    if (this.settings.type && this.settings.type.form === "default") {
      Object.keys(this.scheme).forEach((step) => {
        const target = this.scheme[step].target;
        if (target) {
          const element = document.querySelector(target);
          if (element) {
            element.style.display = "block";
          }
        }
      });
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
      this.scheme[stepName].function();
    }

    this.currentStep = stepName;
  }

  submitForm(submitConfig) {
    if (!submitConfig) return;

    console.log(
      "Отправка формы с данными:",
      window.AbrosTiForm[this.settings.name]
    );

    if (submitConfig.form) {
      const resultForm = document.querySelector(submitConfig.form);
      if (resultForm) {
        resultForm.style.display = "block";
      }
    }
  }
}
