import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      '.pop-up__save-button_type_submit'
    );
  }

  setAction(action) {
    this._actionAfterUserConfirmation = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._actionAfterUserConfirmation();
      this.close();
    });
  }
}
