const editProfileButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const сloseButtons=document.querySelectorAll('.pop-up__close-button');

const popUpTypeCard=document.querySelector('.pop-up_type_card');
const popUpTypeProfile=document.querySelector('.pop-up_type_profile');
const popUpTypeImage=document.querySelector('.pop-up_type_image');

const inputProfileName=document.querySelector('.pop-up__text_content_name');
const inputProfileProfession=document.querySelector('.pop-up__text_content_profession');
const savedProfileName=document.querySelector('.profile__name');
const savedProfileProfession=document.querySelector('.profile__profession');

const inputCardUrl=document.querySelector('.pop-up__text_content_url');
const inputCardPlace=document.querySelector('.pop-up__text_content_place');
const popUpImage=document.querySelector('.pop-up__image');
const popUpDescription=document.querySelector('.pop-up__description');

const formTypeProfile=document.querySelector('.pop-up__form_type_profile');
const formTypeCard=document.querySelector('.pop-up__form_type_card');

const cardsContainer=document.querySelector('.elements');
const cardTemplate=document.querySelector('.elements__template').content;

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

editProfileButton.addEventListener('click', openPopUpTypeProfile);
addButton.addEventListener('click', openPopUpTypeCard);
сloseButtons.forEach (function (item) {
  item.addEventListener('click', closePopUp);
}) 
formTypeProfile.addEventListener('submit', saveProfileUpdate);
formTypeCard.addEventListener('submit', addNewCard);

function openPopUpTypeProfile() {
  inputProfileName.value=savedProfileName.textContent;
  inputProfileProfession.value=savedProfileProfession.textContent;
  popUpTypeProfile.classList.add('pop-up_opened');
}

function openPopUpTypeCard() {
  popUpTypeCard.classList.add('pop-up_opened');
  inputCardUrl.value='';
  inputCardPlace.value='';
}
 
function closePopUp(event) {
  event.target.closest(".pop-up").classList.remove('pop-up_opened');
}

function saveProfileUpdate(event) {
  event.preventDefault(); 
  savedProfileName.textContent=inputProfileName.value;
  savedProfileProfession.textContent=inputProfileProfession.value;
  closePopUp(event);
}

initialCards.forEach (function (item) {
  card=cardTemplate.querySelector('.elements__element').cloneNode(true);
  card.querySelector('.elements__image').src=item.link;
  card.querySelector('.elements__image').alt='картинка';
  card.querySelector('.elements__description').textContent=item.name;
  card.querySelector('.elements__like').addEventListener('click', сhangeLike);
  card.querySelector('.elements__trash-button').addEventListener('click', deleteCard);
  card.querySelector('.elements__image').addEventListener('click', openImage);
  cardsContainer.append(card);
})

function addNewCard(event) {
  event.preventDefault();
  card=cardTemplate.querySelector('.elements__element').cloneNode(true);
  card.querySelector('.elements__image').src=inputCardUrl.value;
  card.querySelector('.elements__image').alt='картинка';
  card.querySelector('.elements__description').textContent=inputCardPlace.value;
  card.querySelector('.elements__like').addEventListener('click', сhangeLike);
  card.querySelector('.elements__trash-button').addEventListener('click', deleteCard);
  card.querySelector('.elements__image').addEventListener('click', openImage);
  cardsContainer.prepend(card);
  closePopUp(event);
}

function сhangeLike(event) {
  const like=event.target;  
  like.classList.toggle('elements__like_checked');
}

function deleteCard(event) { 
  cardsContainer.removeChild(event.target.parentNode);
}

function openImage(event) {
  popUpTypeImage.classList.add('pop-up_opened');
  popUpImage.src=event.target.src;
  popUpDescription.textContent=event.target.parentNode.querySelector('.elements__description').textContent;
}