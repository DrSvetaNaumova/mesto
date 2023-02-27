const editProfileButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const сloseButtons = document.querySelectorAll(".pop-up__close-button");

const popUpTypeCard = document.querySelector(".pop-up_type_card");
const popUpTypeProfile = document.querySelector(".pop-up_type_profile");
const popUpTypeImage = document.querySelector(".pop-up_type_image");

const inputProfileName = document.querySelector(".pop-up__text_content_name");
const inputProfileProfession = document.querySelector(".pop-up__text_content_profession");
const savedProfileName = document.querySelector(".profile__name");
const savedProfileProfession = document.querySelector(".profile__profession");

const inputCardUrl = document.querySelector(".pop-up__text_content_url");
const inputCardPlace = document.querySelector(".pop-up__text_content_place");
const popUpImage = document.querySelector(".pop-up__image");
const popUpDescription = document.querySelector(".pop-up__description");

const formTypeProfile = document.querySelector(".pop-up__form_type_profile");
const formTypeCard = document.querySelector(".pop-up__form_type_card");

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".elements__template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

editProfileButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addNewCard);
сloseButtons.forEach((item) => {
  const popUp = item.closest(".pop-up");
  item.addEventListener("click", () => closePopUp(popUp));
});

formTypeProfile.addEventListener("submit", saveProfileUpdate);
formTypeCard.addEventListener("submit", saveNewCard);

function openPopUp(popUp) {
  popUp.classList.add("pop-up_opened");
}

function closePopUp(popUp) {
  popUp.classList.remove("pop-up_opened");
}

function editProfile() {
  inputProfileName.value = savedProfileName.textContent;
  inputProfileProfession.value = savedProfileProfession.textContent;
  openPopUp(popUpTypeProfile);
}

function saveProfileUpdate(event) {
  event.preventDefault();
  savedProfileName.textContent = inputProfileName.value;
  savedProfileProfession.textContent = inputProfileProfession.value;
  closePopUp(popUpTypeProfile);
}

function createCard(item) {
  const card = cardTemplate.querySelector(".elements__element").cloneNode(true);
  const cardImage = card.querySelector(".elements__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardDescription = card.querySelector(".elements__description");
  cardDescription.textContent = item.name;
  card.querySelector(".elements__like").addEventListener("click", сhangeLike);
  card
    .querySelector(".elements__trash-button")
    .addEventListener("click", deleteCard);
  cardImage.addEventListener("click", () => {
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

function addNewCard() {
  openPopUp(popUpTypeCard);
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
  like.classList.toggle("elements__like_checked");
}

function deleteCard(event) {
  event.target.closest(".elements__element").remove();
}