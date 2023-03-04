const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');
const popupButtonEdit = document.querySelector('.edit-button');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

popupButtonEdit.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
