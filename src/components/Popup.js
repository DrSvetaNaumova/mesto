export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      '.pop-up__close-button'
    );
  }

  open() {
    this._popupElement.classList.add('pop-up_opened');
  }

  close() {
    this._popupElement.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.removeEventListener('click', this._handleOverlayClose.bind(this));
    this._closeButton.removeEventListener('click', this.close.bind(this));
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this)); 
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}