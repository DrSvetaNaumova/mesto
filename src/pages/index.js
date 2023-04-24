import '../pages/index.css';
import { FormValidator} from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig,} from '../components/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo} from '../components/UserInfo.js';
import Section from '../components/Section.js';

const popupProfileEditButton = document.querySelector('.profile__edit-button');
popupProfileEditButton.addEventListener('click', () =>  editProfile());

const popupCardOpenButton = document.querySelector('.profile__add-button');
popupCardOpenButton.addEventListener('click', () => openNewCardForm());

const inputProfileName = document.querySelector('.pop-up__input_type_name');
const inputProfileProfession = document.querySelector('.pop-up__input_type_profession');

const cardList = new Section(initialCards, createCard, '.elements');
cardList.renderItems();

const formTypeCardValidator = new FormValidator(validationConfig, '.pop-up__form_type_card');
formTypeCardValidator.enableValidation();

const formTypeProfileValidator = new FormValidator(validationConfig, '.pop-up__form_type_profile');
formTypeProfileValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupWithFormProfile = new PopupWithForm ('.pop-up_type_profile', saveProfileUpdate);
popupWithFormProfile.setEventListeners();

function editProfile() {
  popupWithFormProfile.open();
  formTypeProfileValidator.resetValidation();
  const savedUserInfo = userInfo.getUserInfo();
  inputProfileName.value = savedUserInfo.name;
  inputProfileProfession.value = savedUserInfo.profession;
}

function saveProfileUpdate(event, formData) {
  event.preventDefault();
  userInfo.setUserInfo(formData.login, formData.profession);
}

const popupWithFormCard = new PopupWithForm ('.pop-up_type_card', saveNewCard);
popupWithFormCard.setEventListeners();

function openNewCardForm() {
  popupWithFormCard.open();
  formTypeCardValidator.resetValidation();
}

function createCard(data) {
  const card = new Card(data, '.elements__template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);  
}

function saveNewCard(event, formData) {
  event.preventDefault();
 createCard({name: formData.place, link: formData.url}); 
}

const popupWithImage = new PopupWithImage('.pop-up_type_image');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}