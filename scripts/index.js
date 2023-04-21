/*Кнопки закрытия попапов */
const popupsClose = document.querySelectorAll(".popup__close-icon");
const popups = document.querySelectorAll(".popup");
/*Попапы*/
const popupEditProfile = document.querySelector(".popup_popup_edit-profile");
const popupAddCard = document.querySelector(".popup_popup_add-card");
const popupImage = document.querySelector(".popup_popup_image");

/* Формы */
const formEditProfile = document.forms["profile-form"];
const formAddCard = document.forms["card-form"];

/*Кнопки открытия попоапов*/
const popupButtonEdit = document.querySelector(".edit-button");
const buttonAddCard = document.querySelector(".add-button");

/*Кнопки закрытия попапов*/
const popupEditProfileClose =
  popupEditProfile.querySelector(".popup__close-icon");
const popupAddCardClose = popupAddCard.querySelector(".popup__close-icon");
const popupImageClose = popupImage.querySelector(".popup__close-icon");

/*Поля ввода редактирования профайла*/
const nameInput = popupEditProfile.querySelector(".form__field_value_name");
const jobInput = popupEditProfile.querySelector(".form__field_value_job");

/*Текстовые значения в профайле*/
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

/*Поля ввода добавления фото*/
const placeInput = popupAddCard.querySelector(".form__field_value_place");
const srcInput = popupAddCard.querySelector(".form__field_value_src");

const photoGallery = document.querySelector(".photo-gallery__list");
//const cardTemplate = document.querySelector("#photo-gallery").content;

const imagePopupFigure = document.querySelector(".popup__figure-image");
const captionPopupFigure = document.querySelector(".popup__figure-caption");

/*Для функции  сброса ошибок*/
const buttonSubmitEditProfile = formEditProfile.querySelector(".button-submit");
const inputsEditProfile = formEditProfile.querySelectorAll(".form__field");
const buttonSubmitAddCard = formAddCard.querySelector(".button-submit");
const inputsAddCard = formAddCard.querySelectorAll(".form__field");

class Card {
  constructor(dataCard, cardTemplate) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._cardTemplate = cardTemplate;
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
    const cardImage = this._card.querySelector(".photo-gallery__image");
    const cardTitle = this._card.querySelector(".photo-gallery__title");
    cardTitle.alt = this._name;
    cardImage.src = this._link;
    cardTitle.textContent = this._name;
    return this._card;
  }

  _switchLike(evt) {
    evt.target.classList.toggle("button-like_active");
  }

  _deleteCard() {
    this._card.remove();
  }
  _setEventListener() {
    this._cardLikeButton = this._card.querySelector(".button-like");
    this._trashButton = this._card.querySelector(".button-trash");
    this._cardImage = this._card.querySelector(".photo-gallery__image");
    this._trashButton.addEventListener("click", () => this._deleteCard());
    this._cardLikeButton.addEventListener("click", this._switchLike);
    this._cardImage.addEventListener("click", () => this._openFigurePopup());
  }

  _openFigurePopup() {
    imagePopupFigure.src = this._link;
    imagePopupFigure.alt = this._name;
    captionPopupFigure.textContent = this._name;
    openPopup(popupImage);
  }
}

/* Функция закрытия попапа по overlay */
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

/* Закрытие попапа по кнопке eskape*/
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

/*Закрытие попапов (ищем все иконки закрытия) по клику */
popupsClose.forEach((element) => {
  const popup = element.closest(".popup");
  popup.addEventListener("click", closePopupOverlay);
  popup.addEventListener("click", closePopupOverlay);
  element.addEventListener("click", () => {
    closePopup(popup);
  });
});

// function openFigurePopup(name, link) {
//   imagePopupFigure.src = link;
//   imagePopupFigure.alt = name;
//   captionPopupFigure.textContent = name;
//   openPopup(popupImage);
// }

/*Создание карточки*/
//const createCard = function (item) {
// const cardElement = cardTemplate
//   .querySelector(".photo-gallery__item")
//   .cloneNode(true);
// const cardImage = cardElement.querySelector(".photo-gallery__image");
// const cardTitle = cardElement.querySelector(".photo-gallery__title");
// cardImage.alt = item.name;
// cardImage.src = item.link;
// cardTitle.textContent = item.name;
// const cardLikeButton = cardElement.querySelector(".button-like");
// const trashButton = cardElement.querySelector(".button-trash");
// cardImage.addEventListener("click", () =>
//   openFigurePopup(item.name, item.link)
// );
// /*Удаление карточки при нажатии на корзину*/
// trashButton.addEventListener("click", () => {
//   cardElement.remove();
// });
// /*Переключение кнопки лайка*/
// cardLikeButton.addEventListener("click", function (evt) {
//   evt.target.classList.toggle("button-like_active");
// });
// return cardElement;
//};

/*Функция добавления карточки из поля формы*/
function handleAddSubmit(evt) {
  evt.preventDefault();
  // const newCard = createCard({
  //   name: placeInput.value,
  //   link: srcInput.value,
  // });
  const newCard = new Card(
    { name: placeInput.value, link: srcInput.value },
    "#photo-gallery"
  );
  console.log(newCard.generateCard());
  photoGallery.prepend(newCard.generateCard());
  evt.target.reset();
  closePopup(popupAddCard);
}

/*Отправка формы редактирования профайла*/
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
/*Отправка формы добавления карточек*/
formAddCard.addEventListener("submit", handleAddSubmit);

/*Добавление карточек из массива в JS*/
// initialCards.forEach(function (item) {
//   const newCard = createCard(item);
//   photoGallery.append(newCard);
// });

initialCards.forEach((item) => {
  const card = new Card(item, "#photo-gallery");
  constCardElement = card.generateCard();
  photoGallery.append(constCardElement);
});

/* Открытие popap универсальная функция*/
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
};

/*Вставка значений из формы, кнопка сохранить на формк редактирования профиля*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  nameProfile.textContent = nameInput.value; // Получение  значений из полей инпут
  jobProfile.textContent = jobInput.value; // Получение  значений из полей инпут
  closePopup(popupEditProfile);
}

/* Открытие попапа редактирования профайла */
popupButtonEdit.addEventListener("click", function () {
  resetErrorInput(formEditProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  toggleButton(
    inputsEditProfile,
    buttonSubmitEditProfile,
    objectValidation.inactiveButtonClass
  );
  openPopup(popupEditProfile);
});

/* Открытие попапа добавления фото*/
buttonAddCard.addEventListener("click", function () {
  toggleButton(
    inputsAddCard,
    buttonSubmitAddCard,
    objectValidation.inactiveButtonClass
  );
  openPopup(popupAddCard);
});
