class Popup {
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

export class UserInfo {
  constructor(nameSelector, professionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent,
    };
  }

  setUserInfo(name, profession) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
  }
}
