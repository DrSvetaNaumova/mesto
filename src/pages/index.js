import { FormValidator} from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig,} from '../components/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo} from '../components/UserInfo.js';
import Section from '../components/Section.js';

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () =>  editProfile());

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => addNewCard());

const inputProfileName = document.querySelector('.pop-up__input_type_name');
const inputProfileProfession = document.querySelector('.pop-up__input_type_profession');
const inputCardUrl = document.querySelector('.pop-up__input_type_url');
const inputCardPlace = document.querySelector('.pop-up__input_type_place');

const cardList = new Section(initialCards, createCard, '.elements');
cardList.renderItems();

const formTypeCardValidator = new FormValidator(validationConfig, '.pop-up__form_type_card');
formTypeCardValidator.enableValidation();

const formTypeProfileValidator = new FormValidator(validationConfig, '.pop-up__form_type_profile');
formTypeProfileValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__profession');


function editProfile() {
  const popupWithFormProfile = new PopupWithForm ('.pop-up_type_profile', saveProfileUpdate);
  popupWithFormProfile.open();
  popupWithFormProfile.setEventListeners();
  formTypeProfileValidator.resetValidation();
  const savedUserInfo = userInfo.getUserInfo();
  inputProfileName.value = savedUserInfo.name;
  inputProfileProfession.value = savedUserInfo.profession;
}

function saveProfileUpdate(event) {
  event.preventDefault();
  userInfo.setUserInfo(inputProfileName.value, inputProfileProfession.value);
}

function addNewCard() {
  const popupWithFormCard = new PopupWithForm ('.pop-up_type_card', saveNewCard);
  popupWithFormCard.open();
  popupWithFormCard.setEventListeners();
  formTypeCardValidator.resetValidation();
}

function createCard(data) {
  const card = new Card(data, '.elements__template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);  
}

function saveNewCard(event) {
  event.preventDefault();
  const data = { name: inputCardPlace.value, link: inputCardUrl.value };
  createCard(data);
}

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage('.pop-up_type_image', name, link)
  popupWithImage.open();
  popupWithImage.setEventListeners();
}

import '../pages/index.css';