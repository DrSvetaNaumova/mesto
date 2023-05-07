export default class UserInfo {
    constructor(nameSelector, professionSelector, avatarSelector) {
      this._nameElement = document.querySelector(nameSelector);
      this._professionElement = document.querySelector(professionSelector);
      this._avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        profession: this._professionElement.textContent,
        avatar: this._avatarElement.src,
        userID: this._userID
      };
    }
  
    setUserFullInfo(name, profession, avatar, userID) {
      this._nameElement.textContent = name;
      this._professionElement.textContent = profession;
      this._avatarElement.src = avatar,
      this._userID = userID
    }

    setUserNameAndProfession(name, profession) {
      this._nameElement.textContent = name;
      this._professionElement.textContent = profession;
    }

    setUserAvatar(avatar) {
      this._avatarElement.src = avatar
    }
  }