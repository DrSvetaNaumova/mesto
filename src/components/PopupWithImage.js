import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
      super(popupSelector);
      this.link = link;
      this.name = name;
    }
  
    open() {
      const popUpImage = document.querySelector('.pop-up__image');
      const popUpDescription = document.querySelector('.pop-up__description');
      popUpImage.src = this.link;
      popUpImage.alt = this.name;
      popUpDescription.textContent = this.name;
      super.open();
    }
  }