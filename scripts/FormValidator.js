export default class FormValidator {
  constructor(objectValidation, form) {
    this._inputSelector = objectValidation.inputSelector;
    this._submitButtonSelector = objectValidation.submitButtonSelector;
    this._inactiveButtonClass = objectValidation.inactiveButtonClass;
    this._inputErrorClass = objectValidation.inputErrorClass;
    this._errorClass = objectValidation.errorClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputs = form.querySelectorAll(this._inputSelector);
  }

  _disableButtonSubmit() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _enableButtonSubmit() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _hasInvalidInput() {
    return Array.from(this._inputs).some((input) => !input.validity.valid);
  }

  toggleButton() {
    if (this._hasInvalidInput()) {
      this._disableButtonSubmit();
    } else {
      this._enableButtonSubmit();
    }
  }

  _hideError(input, errorContainer) {
    input.classList.remove(this._inputErrorClass);
    errorContainer.classList.remove(this._errorClass);
    errorContainer.textContent = "";
  }

  _showError(input, errorContainer) {
    errorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.add(this._errorClass);
  }
  _checkInputValidity(input) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._hideError(input, errorContainer);
    } else {
      this._showError(input, errorContainer);
    }
  }

  _setEventListener() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButton(input);
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  resetErrorInput() {
    this._inputs.forEach((input) => {
      const errorContainer = this._form.querySelector(`#${input.id}-error`);
      if (!input.validity.valid) {
        this._hideError(input, errorContainer);
      }
      this._disableButtonSubmit();
    });
  }
}
