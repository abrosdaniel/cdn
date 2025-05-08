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

          const observer = new MutationObserver((mutationsList, observer) => {
            mutationsList.forEach((mutation) => {
              if (mutation.type === "childList") {
                const stepTarget = document.querySelector(step.target);
                if (stepTarget) {
                  console.log(
                    `Перемещаем ${step.target} в родителя ${this.scheme.step_1.target}`
                  );
                  step1Parent.appendChild(stepTarget);
                }
              }
            });
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
      }

      if (step.next && step.next.target) {
        const stepTarget = document.querySelector(step.target);
        const nextButton = stepTarget.querySelector(step.next.target);
        if (nextButton) {
          nextButton.addEventListener("click", () => {
            this.setStep(step.next.form);
          });
        }
      }

      if (step.prev && step.prev.target) {
        const stepTarget = document.querySelector(step.target);
        const prevButton = stepTarget.querySelector(step.prev.target);
        if (prevButton) {
          prevButton.addEventListener("click", () => {
            this.setStep(step.prev.form);
          });
        }
      }

      if (step.submit && step.submit.target) {
        const stepTarget = document.querySelector(step.target);
        const submitButton = stepTarget.querySelector(step.submit.target);
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
    formSelectors.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) {
        console.warn(`Блок с классом или ID: ${selector} - не найден.`);
        return;
      }
      const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === "childList") {
            const formElement = container.querySelector("form");
            if (formElement) {
              observer.disconnect();
              this.trackFormInputs(formElement);
            }
          }
        });
      });
      observer.observe(container, { childList: true, subtree: true });
    });
  }

  trackFormInputs(formElement) {
    const formDataObject = {};
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

    this.proxyFormData = new Proxy(formDataObject, {
      set: (target, key, value) => {
        target[key] = value;
        this.formData[key] = value;
        return true;
      },
    });

    this.formData = formDataObject;

    if (!window.AbrosTiForm) {
      window.AbrosTiForm = {};
    }
    window.AbrosTiForm[this.settings.name] = this.formData;
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

    console.log("Отправка формы с данными:", this.formData);

    if (submitConfig.form) {
      const resultForm = document.querySelector(submitConfig.form);
      if (resultForm) {
        resultForm.style.display = "block";
      }
    }
  }
}
