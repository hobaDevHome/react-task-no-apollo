import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCartItem } from '../../../store/actions';
import { deleteCartItem } from '../../../store/actions';
import OverlayAddRemove from '../../UI/Buttons/OverlayAddRemove';
import ColorBtn from '../../UI/Buttons/ColorBtn';
import OverlaySizeButton from '../../UI/Buttons/OverlaySizeButton';
import './CartItemOverlay.css';

class CartItemOverlay extends Component {
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }
  attrValue;
  attrName;
  correspondingProduct;
  onAddItem() {
    this.props.addCartItem(this.correspondingProduct);
  }
  onDeleteItem() {
    this.props.deleteCartItem(this.props.cartItem.id);
  }
  render() {
    let price;
    if (this.props.cartItems !== undefined) {
      price = this.props.cartItem.productPrice.find(
        (price) => price.currency.symbol === this.props.currency
      ).amount;
      const found = this.props.clickedAttributes.find(
        (att) => att.id === this.props.cartItem.id
      );
      if (this.props.productsList.products !== undefined) {
        this.correspondingProduct = this.props.productsList.products.find(
          (prod) => prod.id === this.props.cartItem.id
        );
      }
      if (found) {
        this.attrName = found.name;
        this.attrValue = found.attribute.value;
      }
    }

    return (
      <div className="overlay-cart-item">
        <div className="overlay-item-data">
          <div className="overlay-item-title-details">
            {this.props.cartItem.productTitle}
          </div>

          <div className="overlay-price-amount">
            {`${this.props.currency} ${parseFloat(
              price * this.props.cartItem.quantity
            ).toFixed(2)}`}
          </div>

          <div className="overlay-sizes-buttons">
            {this.attrName === 'Color' ? (
              <ColorBtn
                style={{
                  backgroundColor: this.attrValue,
                  border: '2px solid rgb(218, 48, 203)',
                }}
              ></ColorBtn>
            ) : null}
            {this.attrName === 'Size' || this.attrName === 'Capacity' ? (
              <OverlaySizeButton
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                {this.attrValue}
              </OverlaySizeButton>
            ) : null}
          </div>
        </div>
        <div className="overlay-item-images-quantity">
          <div className="overlay-quantity-div">
            <OverlayAddRemove onClick={this.onAddItem}>+</OverlayAddRemove>
            <div className="overlay-quantity">
              {this.props.cartItem.quantity}
            </div>
            <OverlayAddRemove onClick={this.onDeleteItem}>-</OverlayAddRemove>
          </div>
          <div className="overlay-item-pic">
            <img src={this.props.cartItem.gallery[0]} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    cartItems: state.cartItems,
    totalAmount: state.totalAmount,
    clickedAttributes: state.clickedAttributes,
    productsList: state.productsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartItem: (item) => dispatch(addCartItem(item)),
    deleteCartItem: (id) => dispatch(deleteCartItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemOverlay);
