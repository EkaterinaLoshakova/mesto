export default class UserInfo {
  constructor(objectInfo) {
    this._nameSelector = document.querySelector(objectInfo.nameSelector);
    this._jobSelector = document.querySelector(objectInfo.jobSelector);
    this._avatarSelector = document.querySelector(objectInfo.avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
    this._avatarSelector.src = avatar;
    console.log(this._nameSelector.textContent);
    console.log(this._avatarSelector.src);
  }
}
