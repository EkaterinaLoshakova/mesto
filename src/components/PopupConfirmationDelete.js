import Popup from "./Popup.js";
export default class PopupConfirmationDelete extends Popup {
  constructor(selectorPopup, submitFunction) {
    super(selectorPopup);
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction({ card: this._element, cardId: this._dataCardId });
    });
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._dataCardId = cardId;
    console.log(card);
    console.log(cardId);
  };
}
