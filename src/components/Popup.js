export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.pop-up__close-button');
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);// чтобы клик по document не вызывал лишний раз данное событие, если не открыт ни один попап
  }

  close() {
    this._popupElement.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleOverlayClose);
    this._closeButton.addEventListener('click', this.close);
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