import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector(".popup__figure-image");
    this._imageCaptionPopup = this._popup.querySelector(
      ".popup__figure-caption"
    );
  }

  open = (dataCard) => {
    this._popupImage.src = dataCard.link;
    this._popupImage.alt = dataCard.name;
    this._imageCaptionPopup.textContent = dataCard.name;
    super.open();
  };
}
