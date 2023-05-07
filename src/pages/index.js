import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { validationConfig } from '../components/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

const popupProfileEditButton = document.querySelector('.profile__edit-button');
popupProfileEditButton.addEventListener('click', () => editProfile());

const popupCardOpenButton = document.querySelector('.profile__add-button');
popupCardOpenButton.addEventListener('click', () => openNewCardForm());

const popupSaveProfileButton = document.querySelector(
  '.pop-up__save-button_type_profile'
);
const popupSaveAvatarButton = document.querySelector(
  '.pop-up__save-button_type_avatar'
);
const popupSaveCardButton = document.querySelector(
  '.pop-up__save-button_type_card'
);

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

const inputProfileName = document.querySelector('.pop-up__input_type_name');
const inputProfileProfession = document.querySelector(
  '.pop-up__input_type_profession'
);

const avatarContainer = document.querySelector('.profile__avatar-container');
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
  api
    .replaceAvatar(formData.avatar)
    .then((response) => {
      if (response.ok) {
        userInfo.setUserAvatar(formData.avatar);
      }
      popupSaveAvatarButton.textContent = 'Создать';
    })
    .catch((err) => {
      console.log(err);
    });
  popupSaveAvatarButton.textContent = 'Сохранение...';
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
  api
    .replaceUserInfo(formData.login, formData.profession)
    .then((response) => {
      if (response.ok) {
        userInfo.setUserNameAndProfession(formData.login, formData.profession);
      }
      popupSaveProfileButton.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
  popupSaveProfileButton.textContent = 'Сохранение...';
}

function openNewCardForm() {
  popupWithFormCard.open();
  formTypeCardValidator.resetValidation();
}

function createCard(data) {
  const userID = userInfo.getUserInfo().userID;
  const handleLikeClick = (that) => {
    if (!that._isLikedByUser()) {
      api.deleteLike(that._cardID).then((response) => {
        that._likes = response.likes;
        that._counter.textContent = response.likes.length;
        if (that._isLikedByUser()) {
          that._likeElement.classList.add('elements__like_checked');
        }
      });
    } else {
      api.addLike(that._cardID).then((response) => {
        that._likes = response.likes;
        that._counter.textContent = response.likes.length;
        if (!that._isLikedByUser()) {
          that._likeElement.classList.remove('elements__like_checked');
        }
      });
    }
  };

  const handleTrashIconClick = (that) => {
    const actionAfterUserConfirmation = () => {
      that._element.remove();
      that._element = null;
      api.deleteCard(that._cardID);
    };
    const popupWithSubmit = new PopupWithSubmit(
      '.pop-up_type_submit',
      actionAfterUserConfirmation
    );
    popupWithSubmit.setEventListeners();
    popupWithSubmit.open();
  };
  const card = new Card(
    data,
    '.elements__template',
    handleCardClick,
    handleLikeClick,
    handleTrashIconClick,
    userID
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

function saveNewCard(event, formData) {
  event.preventDefault();
  api.addNewCard(formData.place, formData.url).then((response) => {
    createCard(response);
    popupSaveCardButton.textContent = 'Сохранить';
  });
  popupSaveCardButton.textContent = 'Сохранение...';
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//загрузка страницы

// загрузка информации о пользователе с сервера
await api
  .getUserInfo()
  .then((response) => {
    userInfo.setUserFullInfo(
      response.name,
      response.about,
      response.avatar,
      response._id
    );
  })
  .catch((err) => {
    console.log(err);
  });

// загрузка карточек с сервера
const serverCards = await api.getServerCards();

const cardList = new Section(serverCards, createCard, '.elements');
cardList.renderItems();
