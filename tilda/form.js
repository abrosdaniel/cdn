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
    const firstStep = Object.keys(this.scheme)[0];
    if (firstStep) {
      this.setStep(firstStep);
    }
    this.initSteps();
    this.initFormTracking();
  }

  initSteps() {
    Object.entries(this.scheme).forEach(([stepName, step]) => {
      if (this.settings.type?.window === "popup") {
        this.moveStepsToParent(stepName, step);
      }
      this.bindStepButtons(stepName, step);
    });
  }

  moveStepsToParent(stepName, step) {
    const step1Container = document.querySelector(this.scheme.step_1.target);
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

  bindStepButtons(stepName, step) {
    const stepTarget = document.querySelector(step.target);
    if (!stepTarget) return;

    const bindButton = (buttonSelector, callback) => {
      const button = stepTarget.querySelector(buttonSelector);
      if (button) {
        button.addEventListener("click", callback);
      }
    };

    bindButton(step.next?.target, () =>
      this.handleStepChange(stepTarget, step.next?.form)
    );
    bindButton(step.prev?.target, () =>
      this.handleStepChange(stepTarget, step.prev?.form)
    );
    bindButton(step.submit?.target, () =>
      this.handleSubmit(stepTarget, step.submit)
    );
  }

  handleStepChange(stepTarget, targetStep) {
    const formElement = stepTarget.querySelector("form");
    if (formElement) {
      this.updateFormData(formElement);
    }
    if (targetStep) {
      this.setStep(targetStep);
    }
  }

  handleSubmit(stepTarget, submitConfig) {
    const formElement = stepTarget.querySelector("form");
    if (formElement) {
      this.updateFormData(formElement);
    }
    this.submitForm(submitConfig);
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
          formElement.updateFormData = () => this.updateFormData(formElement);
        }
      });
    });
  }

  updateFormData(formElement) {
    t_onFuncLoad("t_forms__getFormDataJSON", () => {
      const formDataJSON = t_forms__getFormDataJSON(formElement) || {};
      Object.keys(this.formData).forEach((key) => {
        if (!(key in formDataJSON)) {
          delete this.formData[key];
        }
      });
      Object.entries(formDataJSON).forEach(([key, value]) => {
        if (
          key !== "tildaspec-elemid" &&
          key !== "form-spec-comments" &&
          key !== "tildaspec-phone-part" &&
          key !== "tildaspec-phone-part-iso"
        ) {
          this.formData[key] = value;
        }
      });

      console.log("Обновлённые данные формы:", this.formData);
    });
  }

  setStep(stepName) {
    if (!this.scheme[stepName]) {
      console.error(`Шаг ${stepName} не найден в схеме`);
      return;
    }

    const isDefaultForm = this.settings.type?.form === "default";

    Object.entries(this.scheme).forEach(([name, step]) => {
      const element = document.querySelector(step.target);
      if (element) {
        element.style.display =
          isDefaultForm || name === stepName ? "block" : "none";
      }
    });

    if (this.scheme[stepName]?.function) {
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
