export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
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
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._changeLike();
    });

    this._trashButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  createCard() {
    this._setEventListeners();
    return this._element;
  }
}