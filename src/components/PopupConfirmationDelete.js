import Popup from "./Popup.js";
export default class PopupConfirmationDelete extends Popup {
  constructor(selectorPopup, submitFunction) {
    super(selectorPopup);
    this._submitFunction = submitFunction;
    this._button = this._form.querySelector(".button-submit");
    this._buttonText = this._button.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading();
      this._submitFunction({ card: this._element, cardId: this._dataCardId });
    });
  }

  renderLoading() {
    this._button.textContent = this._button.textContent + "...";
  }

  resetButtonText() {
    this._button.textContent = this._buttonText;
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._dataCardId = cardId;
  };
}
