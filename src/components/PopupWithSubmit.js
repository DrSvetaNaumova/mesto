import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, actionAfterUserConfirmation) {
    super(popupSelector);
    this._actionAfterUserConfirmation = actionAfterUserConfirmation;
    this._button = this._popupElement.querySelector(
      '.pop-up__save-button_type_submit'
    );
    this._handleButtonSubmit = () => {
      this._actionAfterUserConfirmation();
      this.close();
    };
    this._handleButtonSubmit = this._handleButtonSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._handleButtonSubmit);
  }

  close() {
    super.close();
    this._button.removeEventListener('click', this._handleButtonSubmit);
  }
}
