export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //проверка ответа сервера
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res;
  }

  // получить данные пользователя (GET)
  getUserInfo() {
    const promise = fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res.json());
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
    }).then(this._checkResponse);
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
    }).then(this._checkResponse);
    return promise;
  }

  //получить массив карточек с сервера
  getServerCards() {
    const promise = fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    })
      // .then((res) => res.json())
      .then(this._checkResponse)
      .then((res) => res.json());
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
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }
  // удалить карточку (DELETE)
  deleteCard(cardID) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
    return promise;
  }

  // “залайкать” карточку (PUT)
  addLike(cardID) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID + '/likes', {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
    
  }

  // удалить лайк карточки (DELETE)
  deleteLike(cardID) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    })
      // .then((res) => res.json())
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }
}
