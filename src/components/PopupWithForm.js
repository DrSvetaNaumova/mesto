import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
      super(popupSelector);
      this.submitForm = submitForm;
      this.form = this._popupElement.querySelector('.pop-up__form');
    }
    _getInputValues() {
      const inputs = Array.from(
        this._popupElement.querySelectorAll('.pop-up__input')
      );
      return inputs.map((input) => input.value);
    }
  
    _submitAndClose(evt) {
      this.submitForm(evt);
      this.close();
    }
    setEventListeners() {
      super.setEventListeners();
      this._boundSubmitAndClose = this._submitAndClose.bind(this);
      this.form.addEventListener('submit', this._boundSubmitAndClose);
    }
  
    close() {
      super.close();
      this.form.reset();
      this.form.removeEventListener('submit', this._boundSubmitAndClose);
    }
  }