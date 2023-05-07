export default class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleLikeClick,
    handleTrashIconClick,
    userID
  ) {
    //data=данные из сервера
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardID = data._id;

    this._cardTemplateSelector = cardTemplateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashIconClick = handleTrashIconClick;

    this._userID = userID;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDescription = this._element.querySelector(
      '.elements__description'
    );
    this._cardDescription.textContent = this._name;
    this._likeElement = this._element.querySelector('.elements__like');
    this._counter = this._element.querySelector('.elements__likes-counter');
    this._counter.textContent = data.likes.length; //из сервера

    this._trashButton = this._element.querySelector('.elements__trash-button');

    if (this._userID !== data.owner._id) {
      this._trashButton.classList.add('elements__trash-button_hidden');
    }

    if (this._isLikedByUser()) {
      this._likeElement.classList.add('elements__like_checked');
    }
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _isLikedByUser() {
    for (const item of this._likes) {
      if (item._id === this._userID) {
        return true;
      }
    }
    return false;
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () =>
      this._handleLikeClick(this)
    ); //анонимная функция для доступа к объекту

    this._trashButton.addEventListener('click', () =>
      this._handleTrashIconClick(this)
    );

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._setEventListeners();
    return this._element;
  }
}
