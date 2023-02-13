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

function saveInput(event) {
  event.preventDefault(); 

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

/*const likeChecked=document.querySelectorAll('.elements__like');
for (let i=0; i<likeChecked.length; i++) {
  likeChecked[i].addEventListener('click', checkedLike);
}

function checkedLike(event) {
   const likeChecked=event.target;
   console.log(likeChecked.classList);
   if (likeChecked.classList.contains('elements__like_checked')) {
      likeChecked.classList.remove('elements__like_checked');
   } else {
      likeChecked.classList.add('elements__like_checked');
   }   
}*/