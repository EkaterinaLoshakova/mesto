export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    this._initialCards = items;
    this.renderer = renderer;
  }

  addCard() {
    this._initialCards.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
