export default class Card {
  constructor(dataCard, cardTemplate, openFigurePopup) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._cardTemplate = cardTemplate;
    this._openFigurePopup = openFigurePopup;
    // this._deleteCard = this._deleteCard.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".photo-gallery__item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListener();
    const cardTitle = this._card.querySelector(".photo-gallery__title");
    cardTitle.alt = this._name;
    this._cardImage.src = this._link;
    cardTitle.textContent = this._name;
    return this._card;
  }

  _switchLike = () => {
    this._cardLikeButton.classList.toggle("button-like_active");
  };

  _deleteCard() {
    this._card.remove();
  }
  _setEventListener() {
    this._cardLikeButton = this._card.querySelector(".button-like");
    this._trashButton = this._card.querySelector(".button-trash");
    this._cardImage = this._card.querySelector(".photo-gallery__image");
    this._trashButton.addEventListener("click", () => this._deleteCard());
    this._cardLikeButton.addEventListener("click", () => this._switchLike());
    this._cardImage.addEventListener("click", () =>
      this._openFigurePopup(this._name, this._link)
    );
  }
}
