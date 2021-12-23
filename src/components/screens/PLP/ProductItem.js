import React, { Component } from "react";

import { connect } from "react-redux";
import AddToCartComp from "../../UI/AddToCartComp/AddToCartComp";
import { Link } from "react-router-dom";
import SizesAtributes from "../PDP/SizesAtributes";
import { changeAttrubute, addCartItem } from "../../../store/actions";

import "./ProductItem.css";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { showMsg: false };
    this.getOwnCartNoOfItems = this.getOwnCartNoOfItems.bind(this);
    this.onAddItem = this.onAddItem.bind(this);

    this.state = { noOfItmesInCart: 1 };
  }

  itemProduct = this.props.product;
  price = 0;
  itemImage;
  attributes = 0;

  onAddItem(item) {
    this.setState({ noOfItmesInCart: this.state.noOfItmesInCart + 1 });
    this.props.addCartItem(item);
  }

  getOwnCartNoOfItems(quantity) {
    this.setState({ noOfItmesInCart: quantity });
  }

  linkComponent() {
    if (this.itemProduct.inStock) {
      return (
        <Link
          to={`/detials/${this.props.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="item-image-container">
            <img
              className="item-image out-of-stock"
              src={this.itemImage}
              alt=""
            />
            <div className="out-lable">
              <p>OUT OF STOCK</p>
            </div>
          </div>
        </Link>
      );
    } else {
      return (
        <div className="item-image-container">
          <img
            className="item-image out-of-stock"
            src={this.itemImage}
            alt=""
          />
          <div className="out-lable">
            <p>OUT OF STOCK</p>
          </div>
        </div>
      );
    }
  }

  render() {
    this.itemImage = this.itemProduct.gallery[0];
    this.price = this.itemProduct.prices.find(
      (price) => price.currency.symbol === this.props.currency
    ).amount;
    if (
      this.props.product.attributes[0] &&
      this.props.product.attributes[0].items !== undefined
    ) {
      this.attributes = this.props.product.attributes[0];
    }

    return (
      <div className={!this.props.inStock ? "item out-of-stock" : "item"}>
        {this.linkComponent()}

        <p className="title">{this.itemProduct.name}</p>
        <p className="price">{`${this.props.currency} ${
          +Math.round(this.price * this.state.noOfItmesInCart * 100) / 100
        }`}</p>

        <div className="add-to-cart-comp">
          {this.itemProduct.inStock && (
            <AddToCartComp
              getOwnCartNoOfItems={this.getOwnCartNoOfItems}
              sentItem={this.itemProduct}
              clicked={this.props.clickedAttributes}
            />
          )}
        </div>
        {this.attributes !== 0 && this.itemProduct.inStock && (
          <SizesAtributes
            attributes={this.attributes}
            sentItem={this.itemProduct}
            id={this.itemProduct.id}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    clickedAttributes: state.clickedAttributes,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute) =>
      dispatch(changeAttrubute(id, attribute)),
    addCartItem: (item) => dispatch(addCartItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
