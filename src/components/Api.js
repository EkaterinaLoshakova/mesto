export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserData() {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: "Катюшка",
        about: "Лапатушка",
        avatar:
          "https://99px.ru/sstorage/56/2013/04/image_560404130643137066424.jpg",
      }),
    }).then((res) => {
      console.log(res);
    });
  }
}
