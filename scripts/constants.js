const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const сloseButtons = document.querySelectorAll('.pop-up__close-button');

const popUpTypeCard = document.querySelector('.pop-up_type_card');
const popUpTypeProfile = document.querySelector('.pop-up_type_profile');
const popUpTypeImage = document.querySelector('.pop-up_type_image');

const inputProfileName = document.querySelector('.pop-up__input_type_name');
const inputProfileProfession = document.querySelector(
  '.pop-up__input_type_profession'
);
const savedProfileName = document.querySelector('.profile__name');
const savedProfileProfession = document.querySelector('.profile__profession');

const inputCardUrl = document.querySelector('.pop-up__input_type_url');
const inputCardPlace = document.querySelector('.pop-up__input_type_place');
const popUpImage = document.querySelector('.pop-up__image');
const popUpDescription = document.querySelector('.pop-up__description');

const formTypeProfile = document.querySelector('.pop-up__form_type_profile');
const formTypeCard = document.querySelector('.pop-up__form_type_card');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elements__template').content;
const cardElement = cardTemplate.querySelector('.elements__element');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const validationConfig = {
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  spanErrorClass: 'pop-up__error_visible',
};

export {
  editProfileButton,
  addButton,
  сloseButtons,
  popUpTypeCard,
  popUpTypeProfile,
  popUpTypeImage,
  inputProfileName,
  inputProfileProfession,
  savedProfileName,
  savedProfileProfession,
  inputCardUrl,
  inputCardPlace,
  popUpImage,
  popUpDescription,
  formTypeProfile,
  formTypeCard,
  cardsContainer,
  cardElement,
  initialCards,
  validationConfig,
};
