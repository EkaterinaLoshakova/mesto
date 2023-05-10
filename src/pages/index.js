import "./index.css";
import {
  initialCards,
  formEditProfile,
  formAddCard,
  selectorList,
  selectorPopupCard,
  objectInfo,
  selectorProfile,
  objectValidation,
  popupButtonEdit,
  buttonAddCard,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo(objectInfo);

/*Создаем объект класса валидации для формы профайла и запускаем ее */
const popupEditProfileValidation = new FormValidator(
  objectValidation,
  formEditProfile
);
popupEditProfileValidation.enableValidation();

/*Создаем объект класса валидации для формы добавления карточки и запускаем ее */
const formAddCardValidation = new FormValidator(objectValidation, formAddCard);
formAddCardValidation.enableValidation();

const popupCard = new PopupWithForm(selectorPopupCard, (data) => {
  // section.addItem(popupCard._getInputValues());
  section.addItem(data);
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage(".popup_popup_image");
popupImage.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#photo-gallery", popupImage.open);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  selectorList
);
section.addCard();

const popupProfile = new PopupWithForm(selectorProfile, (data) => {
  // userInfo.setUserInfo(popupProfile._getInputValues());
  userInfo.setUserInfo(data);
});

popupProfile.setEventListeners();

/* Открытие попапа добавления фото*/
buttonAddCard.addEventListener("click", function () {
  formAddCardValidation.resetErrorInput();
  formAddCardValidation.toggleButton();
  popupCard.open();
});

/* Открытие попапа редактирования профайла */
popupButtonEdit.addEventListener("click", function () {
  popupEditProfileValidation.resetErrorInput();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});
