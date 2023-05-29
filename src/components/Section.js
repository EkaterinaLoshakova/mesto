export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    // this._initialCards = items;
    this._renderer = renderer;
  }

  addCard(cardList) {
    cardList.forEach((element) => {
      this._renderer(element);
      // this._renderer(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }
}
