import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import ViewBagButton from "../../UI/Buttons/ViewBagButton";
import CartItemOverlay from "./CartItemOverlay";
import WideButton from "../../UI/Buttons/WideButton";
import { Link } from "react-router-dom";
import { calculateTotal } from "../../../store/actions";
import { connect } from "react-redux";

import "./CartOverlay.css";

class Backdrop extends Component {
  render() {
    return <div className="backdrop" onClick={this.props.onBackHide} />;
  }
}

class CartModal extends Component {
  render() {
    return (
      <div className="cart-modal">
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById("overlays");

class CartOverlay extends Component {
  render() {
    if (this.props.cartItems !== undefined) {
      this.props.calculateTotal(this.props.cartItems);
    }
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onBackHide={this.props.onHide} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <CartModal>
            <div>
              {this.props.cartItems.length > 0 ? (
                <div>
                  <div className="overlay-item-titles">
                    My Bag. {this.props.cartItems.length} items
                  </div>
                  <div className="overlay-items-containter">
                    {this.props.cartItems.map((item) => {
                      return (
                        <div>
                          <CartItemOverlay key={item.id} cartItem={item} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="overlay-total-containt">
                    <div className="overlay-item-titles">Total </div>
                    <div className="overlay-item-titles">
                      {`${this.props.currency} ${this.props.totalAmount}`}
                    </div>
                  </div>
                  <div className="overlay-buttons-div">
                    <Link
                      to="/cart"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="btn" onClick={this.props.onHide}>
                        <ViewBagButton>view bag</ViewBagButton>
                      </div>
                    </Link>
                    <div className="btn">
                      <WideButton
                        onClick={this.props.onHide}
                        style={{ fontSize: "14px", fontWeight: "normal" }}
                      >
                        check out
                      </WideButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-items-contianer">
                  <div className="no-items-overlay">
                    Your shopping bag is empty right now
                  </div>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      aligntSelf: "center",
                    }}
                    className="noItmesLink"
                    to="/"
                  >
                    <WideButton onClick={this.props.onHide}>
                      see some products
                    </WideButton>
                  </Link>
                </div>
              )}
            </div>
          </CartModal>,
          portalElement
        )}
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
