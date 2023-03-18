editProfileButton.addEventListener('click', () => editProfile(validationConfig));//добавлен конфиг, тк функция editProfile использует элементы конфига
addButton.addEventListener('click', () => addNewCard(validationConfig));////добавлен конфиг, тк функция addNewCard использует элементы конфига
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
  const saveProfileEditButton = formTypeProfile.querySelector('.pop-up__save-button_type_profile');
  saveProfileEditButton.disabled = true;
  saveProfileEditButton.classList.add(config.inactiveButtonClass);
}

function saveProfileUpdate(event) {
  event.preventDefault();
  savedProfileName.textContent = inputProfileName.value;
  savedProfileProfession.textContent = inputProfileProfession.value;
  closePopUp(popUpTypeProfile);
}

function createCard(item) {
  const card = cardElement.cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardDescription = card.querySelector('.elements__description');
  cardDescription.textContent = item.name;
  card.querySelector('.elements__like').addEventListener('click', сhangeLike);
  card.querySelector('.elements__trash-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openPopUp(popUpTypeImage);
    popUpImage.src = cardImage.src;
    popUpImage.alt = cardImage.alt;
    popUpDescription.textContent = cardDescription.textContent;
  });
  return card;
}

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});

function addNewCard(config) {
  openPopUp(popUpTypeCard);
  formTypeCard.reset();
  hideInputError(formTypeCard, inputCardPlace, config);
  hideInputError(formTypeCard, inputCardUrl, config);
  const saveNewCardButton = formTypeCard.querySelector('.pop-up__save-button_type_card');
  saveNewCardButton.disabled = true;
  saveNewCardButton.classList.add(config.inactiveButtonClass);
}

function saveNewCard(event) {
  event.preventDefault();
  const card = createCard({
    name: inputCardPlace.value,
    link: inputCardUrl.value,
  });
  cardsContainer.prepend(card);
  closePopUp(popUpTypeCard);
  event.target.reset();
}

function сhangeLike(event) {
  const like = event.target;
  like.classList.toggle('elements__like_checked');
}

function deleteCard(event) {
  event.target.closest('.elements__element').remove();
}
