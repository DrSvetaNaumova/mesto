import { popUpTypeImage, popUpImage, popUpDescription } from './constants.js';
import { openPopUp } from './index.js';

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _changeLike() {
    this._like.classList.toggle('elements__like_checked');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopUpTypeImage() {
    openPopUp(popUpTypeImage);
    popUpImage.src = this._cardImage.src;
    popUpImage.alt = this._cardImage.alt;
    popUpDescription.textContent = this._cardDescription.textContent;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._changeLike();
    });

    this._trashButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._openPopUpTypeImage();
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDescription = this._element.querySelector(
      '.elements__description'
    );
    this._cardDescription.textContent = this._name;
    this._like = this._element.querySelector('.elements__like');
    this._trashButton = this._element.querySelector('.elements__trash-button');

    this._setEventListeners();

    return this._element;
  }
}
