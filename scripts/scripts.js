const popupElement = document.querySelector('.popup'); //удалить
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');
//let formElement = popupElement.querySelector('.form'); //удалить




/*Попапы*/
const popupEditProfile = document.querySelector('.popup_popup_edit-profile');
const popupAddCard = document.querySelector('.popup_popup_add-card');
const popupImage = document.querySelector('.popup_popup_image');

/* Формы */
let formEditProfile = popupEditProfile.querySelector('.form');
let formAddCard = popupAddCard.querySelector('.form');

/*Кнопки открытия попоапов*/
const popupButtonEdit = document.querySelector('.edit-button')
const buttonAddCard = document.querySelector('.add-button');

/*Кнопки закрытия попапов*/
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close-icon');
const popupAddCardClose = popupAddCard.querySelector('.popup__close-icon');
const popupImageClose = popupImage.querySelector('.popup__close-icon');

/*Поля ввода редактирования профайла*/
const nameInput = popupEditProfile.querySelector('.form__field_value_name');
const jobInput = popupEditProfile.querySelector('.form__field_value_job');

/*Текстовые значения в профайле*/
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

/*Поля ввода добавления фото*/
const placeInput = popupAddCard.querySelector('.form__field_value_place');
const srcInput = popupAddCard.querySelector('.form__field_value_src');

const photoGallery = document.querySelector('.photo-gallery__list');
const cardTemplate = document.querySelector('#photo-gallery').content;

const imagePopupFigure = document.querySelector('.popup__figure-image');
const captionPopupFigure = document.querySelector('.popup__figure-caption');



console.log(popupAddCard);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function openFigurePopup (name, link) {
  imagePopupFigure.src = link;
  imagePopupFigure.alt = name;
  captionPopupFigure.textContent = name;
  openPopup(popupImage);
}

/*Создание карточки*/
const createCard =  function(item) {
  const cardElement = cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
  const cardImage =  cardElement.querySelector('.photo-gallery__image');
  const cardTitle = cardElement.querySelector('.photo-gallery__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  const cardLikeButton = cardElement.querySelector('.button-like');
  const trashButton = cardElement.querySelector('.button-trash');


  cardImage.addEventListener('click', () => openFigurePopup(item.name, item.link));

  /*Удаление карточки при нажатии на корзину*/
  trashButton.addEventListener('click', () => {
    cardElement.remove();
  });
  /*Переключение кнопки лайка*/
  cardLikeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('button-like_active');
      });
  return cardElement;
};

/*Функция добавления карточки из поля формы*/
function handleAddSubmit (evt) {
  evt.preventDefault();
   const newCard = createCard({
    name: placeInput.value,
    link: srcInput.value
  });
  photoGallery.prepend(newCard);
  evt.target.reset();
  closePopup(popupAddCard);
};
formAddCard.addEventListener('submit', handleAddSubmit);

/*Добавление карточек из массива в JS*/
initialCards.forEach(function(item) {
  const newCard = createCard(item);
  photoGallery.append(newCard);
});

/* Открытие popap универсальная функция*/
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
 };

/*Вставка значений из формы, кнопка сохранить на формк редактирования профиля*/
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  nameProfile.textContent = nameInput.value;// Получение  значений из полей инпут
  jobProfile.textContent = jobInput.value;// Получение  значений из полей инпут
  closePopup(popupEditProfile);
};



/* Открытие попапа редактирования профайла */
popupButtonEdit.addEventListener("click", function() {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

 /* Открытие попапа добавления фото*/
 buttonAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
  });



/*Закрытие попапа редактировния профайла*/
popupCloseButtonElement.addEventListener("click", function() {
  closePopup(popupEditProfile);
});
/*Закрытие попапа добавления карточек*/
popupAddCardClose.addEventListener("click", function() {
  closePopup(popupAddCard)
});

/*Закрытие попапа с картинкой*/
popupImageClose.addEventListener('click', function() {
  closePopup(popupImage);
})

formEditProfile.addEventListener('submit', handleFormSubmit);


