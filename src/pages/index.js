import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../utils/validationConfig.js';
import Card from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

import {
  popupProfileEditButton,
  popupCardOpenButton,
  popupSaveProfileButton,
  popupSaveAvatarButton,
  popupSaveCardButton,
  inputProfileName,
  inputProfileProfession,
  avatarContainer,
} from '../utils/constants.js';

popupProfileEditButton.addEventListener('click', () => editProfile());

popupCardOpenButton.addEventListener('click', () => openNewCardForm());

const popupWithFormProfile = new PopupWithForm(
  '.pop-up_type_profile',
  saveProfileUpdate
);
popupWithFormProfile.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(
  '.pop-up_type_avatar',
  saveAvatar
);
popupWithFormAvatar.setEventListeners();

const popupWithFormCard = new PopupWithForm('.pop-up_type_card', saveNewCard);
popupWithFormCard.setEventListeners();

const popupWithImage = new PopupWithImage('.pop-up_type_image');
popupWithImage.setEventListeners();

const popupWithSubmit = new PopupWithSubmit('.pop-up_type_submit');
popupWithSubmit.setEventListeners();

avatarContainer.addEventListener('click', () => editAvatar());

const formTypeProfileValidator = new FormValidator(
  validationConfig,
  '.pop-up__form_type_profile'
);
formTypeProfileValidator.enableValidation();

const formTypeAvatarValidator = new FormValidator(
  validationConfig,
  '.pop-up__form_type_avatar'
);
formTypeAvatarValidator.enableValidation();

const formTypeCardValidator = new FormValidator(
  validationConfig,
  '.pop-up__form_type_card'
);
formTypeCardValidator.enableValidation();

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__profession',
  '.profile__avatar'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'e5c7629d-174e-499d-9501-41f48afec7e6',
    'Content-Type': 'application/json',
  },
});

function editAvatar() {
  popupWithFormAvatar.open();
  formTypeAvatarValidator.resetValidation();
}

function saveAvatar(event, formData) {
  event.preventDefault();
  const promise = api
    .replaceAvatar(formData.avatar)
    .then(() => {
      userInfo.setUserAvatar(formData.avatar);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject('error');
    })
    .finally(() => {
      popupSaveAvatarButton.textContent = 'Создать';
    });

  popupSaveAvatarButton.textContent = 'Сохранение...';
  return promise;
}

function editProfile() {
  popupWithFormProfile.open();
  formTypeProfileValidator.resetValidation();
  const savedUserInfo = userInfo.getUserInfo();
  inputProfileName.value = savedUserInfo.name;
  inputProfileProfession.value = savedUserInfo.profession;
}

function saveProfileUpdate(event, formData) {
  event.preventDefault();
  const promise = api
    .replaceUserInfo(formData.login, formData.profession)
    .then(() => {
      userInfo.setUserNameAndProfession(formData.login, formData.profession);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject('error');
    })
    .finally(() => {
      popupSaveProfileButton.textContent = 'Сохранить';
    });
  popupSaveProfileButton.textContent = 'Сохранение...';
  return promise;
}

function openNewCardForm() {
  popupWithFormCard.open();
  formTypeCardValidator.resetValidation();
}

function createCard(data) {
  const userID = userInfo.getUserInfo().userID;
  const addLike = (cardID) => {
    const promise = api.addLike(cardID).catch((err) => {
      console.log(err);
      return Promise.reject('error');
    });
    return promise;
  };
  const deleteLike = (cardID) => {
    const promise = api.deleteLike(cardID).catch((err) => {
      console.log(err);
      return Promise.reject('error');
    });
    return promise;
  };

  const handleTrashIconClick = (card) => {
    const actionAfterUserConfirmation = () => {
      const promise = api
        .deleteCard(card._cardID)
        .then(() => {
          card.deleteCard();
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject('error');
        });
      return promise;
    };
    popupWithSubmit.open();
    popupWithSubmit.setAction(actionAfterUserConfirmation);
  };

  const card = new Card(
    data,
    '.elements__template',
    handleCardClick,
    addLike,
    deleteLike,
    handleTrashIconClick,
    userID
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

function saveNewCard(event, formData) {
  event.preventDefault();
  const promise = api
    .addNewCard(formData.place, formData.url)
    .then((response) => {
      createCard(response);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject('error');
    })
    .finally(() => {
      popupSaveCardButton.textContent = 'Сохранить';
    });
  popupSaveCardButton.textContent = 'Сохранение...';
  return promise;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//загрузка страницы

let cardList;

Promise.all([api.getUserInfo(), api.getServerCards()])
  .then(([userData, serverCards]) => {
    userInfo.setUserFullInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    cardList = new Section(serverCards, createCard, '.elements');
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
