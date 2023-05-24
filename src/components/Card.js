export default class Card {
  constructor(
    dataCard,
    cardTemplate,
    openFigurePopup,
    openDeletePopup,
    isLike
  ) {
    this._dataCard = dataCard;
    this._myId = dataCard.myId;
    this._ownerId = dataCard.owner._id;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._cardTemplate = cardTemplate;
    this._openFigurePopup = openFigurePopup;
    this._openDeletePopup = openDeletePopup;
    this._likes = dataCard.likes;
    this._likesLength = this._likes.length;
    this._isLike = isLike;
    this._dataCardId = dataCard._id;
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
    this._cardLikeButton = this._card.querySelector(
      ".like-container__button-like"
    );
    this._trashButton = this._card.querySelector(".button-trash");
    this._cardImage = this._card.querySelector(".photo-gallery__image");
    this._counter = this._card.querySelector(".like-container__counter");

    this._setEventListener();
    this._visibleTrash();
    this._checkLike();
    const cardTitle = this._card.querySelector(".photo-gallery__title");
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    cardTitle.textContent = this._name;
    return this._card;
  }

  _switchLike = () => {
    this._isLike(this._dataCardId, this._cardLikeButton);
    // this._cardLikeButton.classList.toggle("like-container__button-like_active");
  };

  _checkLike() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._cardLikeButton.classList.add(
          "like-container__button-like_active"
        );
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._cardLikeButton.classList.toggle("like-container__button-like_active");
    this._counter.textContent = likes.length;
  }

  _deleteCard = () => {
    // this._card.remove();
    // this._card = null;
    this._openDeletePopup({ card: this, cardId: this._dataCardId });
    console.log(this);
    console.log(this._dataCard);
  };

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _visibleTrash() {
    if (this._myId !== this._ownerId) {
      this._trashButton.remove();
    }
  }

  _setEventListener() {
    // this._cardLikeButton = this._card.querySelector(".button-like");
    // this._trashButton = this._card.querySelector(".button-trash");
    // this._cardImage = this._card.querySelector(".photo-gallery__image");
    this._trashButton.addEventListener("click", () => this._deleteCard());
    this._cardLikeButton.addEventListener("click", () => this._switchLike());
    this._cardImage.addEventListener("click", () =>
      this._openFigurePopup(this._dataCard)
    );
  }
}
