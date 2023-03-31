export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }
  _getTemplate() {
    const formElement = document.querySelector(this._formSelector);
    return formElement;
  }

  _showInputError(input) {
    const errorMessage = input.validationMessage;
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._config.spanErrorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.spanErrorClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const button = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  enableValidation() {
    this._form = this._getTemplate();
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
