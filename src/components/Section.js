export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    // this._initialCards = items;
    this._renderer = renderer;
  }

  addCard(cardList) {
    cardList.forEach((element) => {
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
