export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    // this._initialCards = items;
    this.renderer = renderer;
  }

  addCard(cardList) {
    cardList.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }

  addCardSubmit(data) {
    this.renderer(data);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // addItemAppend(element) {
  //   this._container.append(element);
  // }
}
