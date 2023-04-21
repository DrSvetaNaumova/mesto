import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
      super(popupSelector);
      this._popUpImage = this._popupElement.querySelector('.pop-up__image');//NEW
      this._popUpDescription = this._popupElement.querySelector('.pop-up__description');//NEW
      this.link = link;
      this.name = name;
    }
  
    open() {
      this._popUpImage.src = this.link;
      this._popUpImage.alt = this.name;
      this._popUpDescription.textContent = this.name;
      super.open();
    }
  }