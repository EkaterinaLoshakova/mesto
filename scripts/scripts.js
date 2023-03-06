const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');
const popupButtonEdit = document.querySelector('.edit-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__field_value_name');
const jobInput = document.querySelector('.form__field_value_job');
let formElement = popupElement.querySelector('.form');

//let nameInput = popupElement.querySelector('.popup__input-name');
//let jobInput = popupElement.querySelector('.popup__input-job');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  nameProfile.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
  jobProfile.textContent = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  closePopup();
};


popupButtonEdit.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener('submit', handleFormSubmit);
