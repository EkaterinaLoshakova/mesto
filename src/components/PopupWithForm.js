import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitFunction) {
    super(selectorPopup);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__field");
    this.close = this.close.bind(this);
    this._button = this._form.querySelector(".button-submit");
    this._buttonText = this._button.textContent;
    // this._buttonText = this._buttonText.textContent;
  }

  setInputValues(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._button.textContent = this._button.textContent + "...";
      this._submitFunction(this._getInputValues());
      // this.close();
    });
  }

  resetButtonText() {
    this._button.textContent = this._buttonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
