import Card from "./Card.js";
import initialCards from "./cards.js";
import FormValidator from "./FormValidator.js";
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

const objectValidation = {
  //formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".button-submit",
  inactiveButtonClass: "button-submit_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "error_visible",
};

/*Создаем объект класса валидации для формы профайла и запускаем ее */
const popupEditProfileValidation = new FormValidator(
  objectValidation,
  formEditProfile
);
popupEditProfileValidation.enableValidation();

/*Создаем объект класса валидации для формы добавления карточки и запускаем ее */
const formAddCardValidation = new FormValidator(objectValidation, formAddCard);
formAddCardValidation.enableValidation();

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
  element.addEventListener("click", () => {
    closePopup(popup);
  });
});

function openFigurePopup(name, link) {
  imagePopupFigure.src = link;
  imagePopupFigure.alt = name;
  captionPopupFigure.textContent = name;
  openPopup(popupImage);
}

/*Функция создания карточки с использованием класса */
function createCard(item) {
  const card = new Card(item, "#photo-gallery", openFigurePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

/*Функция добавления карточки из поля формы*/
function handleAddSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: srcInput.value,
  };
  photoGallery.prepend(createCard(newCard));
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
  photoGallery.append(createCard(item));
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
  evt.preventDefault();
  nameProfile.textContent = nameInput.value; // Получение  значений из полей инпут
  jobProfile.textContent = jobInput.value; // Получение  значений из полей инпут
  closePopup(popupEditProfile);
}

/* Открытие попапа редактирования профайла */
popupButtonEdit.addEventListener("click", function () {
  // resetErrorInput(formEditProfile);
  popupEditProfileValidation.resetErrorInput();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  // toggleButton(
  //   inputsEditProfile,
  //   buttonSubmitEditProfile,
  //   objectValidation.inactiveButtonClass
  // );
  openPopup(popupEditProfile);
});

/* Открытие попапа добавления фото*/
buttonAddCard.addEventListener("click", function () {
  formAddCardValidation.toggleButton();
  // toggleButton(
  //   inputsAddCard,
  //   buttonSubmitAddCard,
  //   objectValidation.inactiveButtonClass
  // );
  openPopup(popupAddCard);
});
