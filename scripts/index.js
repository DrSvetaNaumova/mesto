import { FormValidator } from './FormValidator.js';
import { Card } from './Сard.js';
import {
  editProfileButton,
  addButton,
  сloseButtons,
  popUpTypeCard,
  popUpTypeProfile,
  inputProfileName,
  inputProfileProfession,
  savedProfileName,
  savedProfileProfession,
  inputCardUrl,
  inputCardPlace,
  formTypeProfile,
  formTypeCard,
  cardsContainer,
  initialCards,
  validationConfig,
} from './constants.js';

editProfileButton.addEventListener('click', () =>
  editProfile(validationConfig)
);
addButton.addEventListener('click', () => addNewCard(validationConfig));
сloseButtons.forEach((item) => {
  const popUp = item.closest('.pop-up');
  item.addEventListener('click', () => closePopUp(popUp));
});

formTypeProfile.addEventListener('submit', saveProfileUpdate);
formTypeCard.addEventListener('submit', saveNewCard);

//закрытие попапа по клику на оверлей
const popUps = document.querySelectorAll('.pop-up');
popUps.forEach((popUp) => {
  popUp.addEventListener('click', (evt) => {
    if (evt.target === popUp) {
      closePopUp(popUp);
    }
  });
});

//закрытие попапа по клику на Esc
function closePopUpByEsc(evt) {
  if (evt.key === 'Escape') {
    const popUpOpened = document.querySelector('.pop-up_opened');
    closePopUp(popUpOpened);
  }
}

function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopUpByEsc);
}

function closePopUp(popUp) {
  popUp.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closePopUpByEsc);
}

function editProfile(config) {
  openPopUp(popUpTypeProfile);
  inputProfileName.value = savedProfileName.textContent;
  inputProfileProfession.value = savedProfileProfession.textContent;
  hideInputError(formTypeProfile, inputProfileName, config);
  hideInputError(formTypeProfile, inputProfileProfession, config);
  const saveProfileEditButton = formTypeProfile.querySelector(
    '.pop-up__save-button_type_profile'
  );
  saveProfileEditButton.disabled = true;
  saveProfileEditButton.classList.add(config.inactiveButtonClass);
}

function saveProfileUpdate(event) {
  event.preventDefault();
  savedProfileName.textContent = inputProfileName.value;
  savedProfileProfession.textContent = inputProfileProfession.value;
  closePopUp(popUpTypeProfile);
}

const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.spanErrorClass);
  error.textContent = '';
};

function addNewCard(config) {
  openPopUp(popUpTypeCard);
  formTypeCard.reset();
  hideInputError(formTypeCard, inputCardPlace, config);
  hideInputError(formTypeCard, inputCardUrl, config);
  const saveNewCardButton = formTypeCard.querySelector(
    '.pop-up__save-button_type_card'
  );
  saveNewCardButton.disabled = true;
  saveNewCardButton.classList.add(config.inactiveButtonClass);
}

function saveNewCard(event) {
  event.preventDefault();
  const data = { name: inputCardPlace.value, link: inputCardUrl.value };
  const card = new Card(data, '.elements__template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
  closePopUp(popUpTypeCard);
  event.target.reset();
}

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.createCard();
  document.querySelector('.elements').append(cardElement);
});

const formTypeCardValidator = new FormValidator(
  validationConfig,
  '.pop-up__form_type_card'
);
formTypeCardValidator.enableValidation();

const formTypeProfileValidator = new FormValidator(
  validationConfig,
  '.pop-up__form_type_profile'
);
formTypeProfileValidator.enableValidation();

export { openPopUp };
