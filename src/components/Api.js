export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // получить данные пользователя (GET)
  getUserInfo() {
    const promise = fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return promise;
  }

  // заменить текстовые данные пользователя (PATCH)
  replaceUserInfo(login, profession) {
    const promise = fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: login,
        about: profession,
      }),
    });
    return promise;
  }

  // заменить аватар пользователя (PATCH)
  replaceAvatar(avatar) {
    const promise = fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    return promise;
  }

  //получить массив карточек с сервера
  getServerCards() {
    const promise = fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return promise;
  }
  //добавить новую карточку
  addNewCard(place, url) {
    const promise = fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: url,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return promise;
  }
  // удалить карточку (DELETE)
  deleteCard(cardID) {
    const promise = fetch(
      'https://mesto.nomoreparties.co/v1/cohort-65/cards/' + cardID,
      {
        method: 'DELETE',
        headers: {
          authorization: 'e5c7629d-174e-499d-9501-41f48afec7e6',
          'Content-Type': 'application/json',
        },
      }
    ).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
    return promise;
  }

  // “залайкать” карточку (PUT)
  addLike(cardID) {
    const promise = fetch(
      'https://mesto.nomoreparties.co/v1/cohort-65/cards/' + cardID + '/likes',
      {
        method: 'DELETE',
        headers: {
          authorization: 'e5c7629d-174e-499d-9501-41f48afec7e6',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return promise;
  }

  // удалить лайк карточки (DELETE)
  deleteLike(cardID) {
    const promise = fetch(
      'https://mesto.nomoreparties.co/v1/cohort-65/cards/' + cardID + '/likes',
      {
        method: 'PUT',
        headers: {
          authorization: 'e5c7629d-174e-499d-9501-41f48afec7e6',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    return promise;
  }
}
