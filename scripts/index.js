const editProfileButton=document.querySelector('.profile__edit-button');
const popUpElement= document.querySelector('.pop-up');
const inputProfileName=document.querySelector('.pop-up__text_content_name');
const inputProfileProfession=document.querySelector('.pop-up__text_content_profession');
const savedProfileName=document.querySelector('.profile__name');
const savedProfileProfession=document.querySelector('.profile__profession');
const сloseButton=document.querySelector('.pop-up__close-button');
const formElement=document.querySelector('.pop-up__form');

function openPopUp() {
  inputProfileName.value=savedProfileName.textContent;
  inputProfileProfession.value=savedProfileProfession.textContent;
  popUpElement.classList.add('pop-up_opened');
}

function closePopUp() {
  popUpElement.classList.remove('pop-up_opened');
}

function saveInput(event) {
  event.preventDefault(); 
  savedProfileName.textContent=inputProfileName.value;
  savedProfileProfession.textContent=inputProfileProfession.value;
  closePopUp();
}

editProfileButton.addEventListener('click', openPopUp);
formElement.addEventListener('submit', saveInput);
сloseButton.addEventListener('click', closePopUp);