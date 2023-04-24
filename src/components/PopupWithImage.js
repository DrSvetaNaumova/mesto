import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    //constructor(popupSelector, name, link) {
      super(popupSelector);
      this._popUpImage = this._popupElement.querySelector('.pop-up__image');
      this._popUpDescription = this._popupElement.querySelector('.pop-up__description');
      // this.link = link;
      // this.name = name;
    }
  
    // open() {
      open(name, link) {
      // this._popUpImage.src = this.link;
      // this._popUpImage.alt = this.name;
      this._popUpImage.src = link;//NEW
      this._popUpImage.alt = name;//NEW
      this._popUpDescription.textContent = name;//NEW
      // this._popUpDescription.textContent = this.name;
      super.open();
    }
  }