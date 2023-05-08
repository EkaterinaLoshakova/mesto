export default class UserInfo {
  constructor(objectInfo) {
    this._nameSelector = document.querySelector(objectInfo.nameSelector);
    this._jobSelector = document.querySelector(objectInfo.jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.job;
  }
}
