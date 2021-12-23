import React, { Component } from 'react';
import CartItemMain from './CartItemMain';
import { connect } from 'react-redux';
import { calculateTotal } from '../../../store/actions';
import './Cart.css';

class Cart extends Component {
  render() {
    if (this.props.cartItems !== undefined) {
      this.props.calculateTotal(this.props.cartItems);
    }
    return (
      <div className="cart-container">
        <div className="cart-title">Cart</div>
        {this.props.cartItems.length > 0 ? (
          <div>
            {this.props.cartItems.map((item) => {
              return (
                <div>
                  <CartItemMain key={item.id} cartItem={item} />
                  <div className="divdier"></div>
                </div>
              );
            })}
            <div className="cart-total">Total:</div>
            <div className="total">{`${this.props.currency} ${this.props.totalAmount}`}</div>
          </div>
        ) : (
          <div className="no-items">Your shopping bag is empty right now</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    currency: state.currency,
    totalAmount: state.totalAmount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    calculateTotal: (items) => dispatch(calculateTotal(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
