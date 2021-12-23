class CartItemModel {
  constructor(quantity, productPrice, productTitle, attributes, id, gallery) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.attributes = attributes;
    this.id = id;
    this.gallery = gallery;
  }
}
export default CartItemModel;
