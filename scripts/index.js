const editProfileButton=document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', openPopUp);

function openPopUp() {
   const inputProfileName=document.querySelector('.pop-up__text_name');
   const inputProfileProfession=document.querySelector('.pop-up__text_profession');
   const savedProfileName=document.querySelector('.profile__name');
   const savedProfileProfession=document.querySelector('.profile__profession');

   inputProfileName.value=savedProfileName.textContent;
   inputProfileProfession.value=savedProfileProfession.textContent;

   const popUpElement= document.querySelector('.pop-up');
   popUpElement.classList.add('pop-up_opened');
}

const saveProfileButton=document.querySelector('.pop-up__save-button');
saveProfileButton.addEventListener('click', saveInput);

function saveInput(evt) {
  evt.preventDefault(); 

  const inputProfileName=document.querySelector('.pop-up__text_name');
  const inputProfileProfession=document.querySelector('.pop-up__text_profession');
  const savedProfileName=document.querySelector('.profile__name');
  const savedProfileProfession=document.querySelector('.profile__profession');

  savedProfileName.textContent=inputProfileName.value;
  savedProfileProfession.textContent=inputProfileProfession.value;

  const popUpElement= document.querySelector('.pop-up');
  popUpElement.classList.remove('pop-up_opened');
}

const CloseButton=document.querySelector('.pop-up__close-button');
CloseButton.addEventListener('click', closePopUp);

function closePopUp() {
   const popUpElement= document.querySelector('.pop-up');
   popUpElement.classList.remove('pop-up_opened');
}




