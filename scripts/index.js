import { FormValidator} from './FormValidator.js';
import { Card } from './Сard.js';
import {
  editProfileButton,
  addButton,
  сloseButtons,
  popUpTypeCard,
  popUpTypeProfile,
  popUpTypeImage,
  popUpImage,
  popUpDescription,
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

editProfileButton.addEventListener('click', () =>
  editProfile()
);
addButton.addEventListener('click', () => addNewCard());

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

function editProfile() {
  openPopUp(popUpTypeProfile);
  formTypeProfileValidator.resetValidation();
  inputProfileName.value = savedProfileName.textContent;
  inputProfileProfession.value = savedProfileProfession.textContent;
}

function saveProfileUpdate(event) {
  event.preventDefault();
  savedProfileName.textContent = inputProfileName.value;
  savedProfileProfession.textContent = inputProfileProfession.value;
  closePopUp(popUpTypeProfile);
}

function addNewCard() {
  openPopUp(popUpTypeCard);
  formTypeCard.reset();
  formTypeCardValidator.resetValidation();
}

function createCard2(data) {
  const card = new Card(data, '.elements__template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = createCard2(data);
  cardsContainer.append(cardElement);
 });

function saveNewCard(event) {
  event.preventDefault();
  const data = { name: inputCardPlace.value, link: inputCardUrl.value };
  const cardElement = createCard2(data);
  cardsContainer.prepend(cardElement);
  closePopUp(popUpTypeCard);
  event.target.reset();
}

function handleCardClick(name, link) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpDescription.textContent = name;
  openPopUp(popUpTypeImage);
}