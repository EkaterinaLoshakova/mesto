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
  buttonEditAvatar,
  formEditAvatar,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmationDelete from "../components/PopupConfirmationDelete.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "a40765c6-fe1b-44c0-b3c0-355a192bdaad",
    "Content-Type": "application/json",
  },
});

/*Создаем новый элемент попа подтверждения  удаления карточки от класса PopupConfirmationDelete*/
const deletePopupConfirmation = new PopupConfirmationDelete(
  ".popup_popup_confirmation",
  ({ card, cardId }) => {
    console.log(card);
    console.log(cardId);

    api
      .deleteCard(cardId)
      .then((res) => {
        console.log(res);
        card.removeCard();
        deletePopupConfirmation.close();
      })
      .catch((error) => console.error(`${error}`));
    // card.removeCard();
  }
);

deletePopupConfirmation.setEventListeners();

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

/*Создаем объект класса валидации для формы редактирования профайла и запускаем ее */
const formEditAvatarValidation = new FormValidator(
  objectValidation,
  formEditAvatar
);
formEditAvatarValidation.enableValidation();

const popupCard = new PopupWithForm(selectorPopupCard, (data) => {
  // section.addItem(popupCard._getInputValues());
  Promise.all([api.getUserData(), api.postCard(data)]).then(
    ([userData, cardData]) => {
      cardData.myId = userData._id;
      section.addItem(cardData);
      popupCard.close();
    }
  );

  console.log(data);
  // section.addItem(data);
  // popupCard.close();
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage(".popup_popup_image");
popupImage.setEventListeners();

const section = new Section(
  {
    // items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#photo-gallery",
        popupImage.open,
        deletePopupConfirmation.open,
        (cardId, cardLikeButton) => {
          if (
            cardLikeButton.classList.contains(
              "like-container__button-like_active"
            )
          ) {
            api.deleteLike(cardId).then((res) => {
              card.toggleLike(res.likes);
            });
          } else {
            api.addLike(cardId).then((res) => {
              card.toggleLike(res.likes);
            });
          }
        }
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  selectorList
);
// section.addCard(initialCards);

const popupProfile = new PopupWithForm(selectorProfile, (data) => {
  // userInfo.setUserInfo(popupProfile._getInputValues());
  api.setUserData(data).then((res) =>
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
      avatar: res.avatar,
    })
  );

  popupProfile.close();
});

popupProfile.setEventListeners();

/* Попап обновления аватара, созданный экземпляром класса PopupWithForm*/
const popupEditAvatar = new PopupWithForm(
  ".popup_popup_update-avatar",
  (data) => {
    // document.querySelector(".profile__avatar").src = data.avatar;
    api.setUserAvatar(data).then((res) =>
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      })
    );
    popupEditAvatar.close();
  }
);

popupEditAvatar.setEventListeners();

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

/* Попап открытия смены аватара*/
buttonEditAvatar.addEventListener("click", function () {
  formEditAvatarValidation.resetErrorInput();
  popupEditAvatar.open();
});

Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    initialCards.forEach((item) => (item.myId = userData._id));
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    section.addCard(initialCards);
  }
);
