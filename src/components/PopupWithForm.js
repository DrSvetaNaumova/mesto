import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
      super(popupSelector);
      this.submitForm = submitForm;
      this._form = this._popupElement.querySelector('.pop-up__form');
      this._inputs = Array.from(this._popupElement.querySelectorAll('.pop-up__input'))

    }
    _getInputValues() {
      const formValues = {};
      this._inputs.forEach((input) => formValues[input.name] = input.value);
      return formValues;
    }
  
    _submitAndClose(evt) {
      const promise = this.submitForm(evt, this._getInputValues());
      promise.then(() => {this.close()})// чтобы попап не закрывался в случае ошибки
      
    }
    setEventListeners() {
      super.setEventListeners();
      this._boundSubmitAndClose = this._submitAndClose.bind(this);
      this._form.addEventListener('submit', this._boundSubmitAndClose);
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  }