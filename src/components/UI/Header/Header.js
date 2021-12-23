import React, { Component } from "react";
import CartOverlay from "../../screens/Cart/CartOverlay";
import { BsCart2 } from "react-icons/bs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeCurrency,
  getSelectedProductsLists,
} from "../../../store/actions";

import "./Header.css";

class Header extends Component {
  state = { showCartModal: false, showCurrency: false };
  numcerOfItems = 0;
  categoryNames;
  currencyNames;
  showCartOverlay() {
    this.setState({ showCartModal: true });
    this.hideCurrencyList();
  }
  hideCartOverlay() {
    this.setState({ showCartModal: false });
  }

  showCurrencyList() {
    this.setState({ showCurrency: true });
  }
  hideCurrencyList() {
    this.setState({ showCurrency: false });
  }
  toggleCurrencyList() {
    this.hideCartOverlay();
    this.setState({ showCurrency: !this.state.showCurrency });
  }

  onChooseCurrencyHandler(newCurrency) {
    this.props.changeCurrency(newCurrency);

    this.hideCurrencyList();
  }

  onChosseCatHandler(choosecCat) {
    this.props.getSelectedProductsLists(choosecCat);
    localStorage.setItem("category", choosecCat);
  }
  getCartItemsNo() {
    let amuont = 0;
    const mapping = this.props.cartItems.map((el) => (amuont += el.quantity));
    this.numcerOfItems = amuont;
  }
  getCategoriesNames() {
    const prods = this.props.query;

    if (prods) {
      this.categoryNames = prods.map((prod) => prod.name);
      console.log(prods);
    }
  }
  getCurrencyNames() {
    const prods = this.props.query;

    if (prods.length > 0 && prods !== undefined) {
      if (prods[0] !== undefined && prods[0].products !== undefined) {
        this.currencyNames = prods[0].products[0].prices.map(
          (prod) => `${prod.currency.symbol} ${prod.currency.label}`
        );
      }
    }
  }
  render() {
    if (this.props.query !== undefined) {
      this.getCartItemsNo();
      this.getCategoriesNames();
      this.getCurrencyNames();
    }
    return (
      <div className="header-row" style={this.props.style}>
        {this.state.showCurrency && (
          <div className="currency-list">
            {this.currencyNames.map((cur) => {
              return (
                <div
                  key={cur.length}
                  className="currency-item"
                  onClick={() =>
                    this.onChooseCurrencyHandler(cur.split(" ")[0])
                  }
                >
                  {cur}
                </div>
              );
            })}
          </div>
        )}
        {this.state.showCartModal && (
          <CartOverlay onHide={this.hideCartOverlay.bind(this)} />
        )}
        <div className="links-section">
          <ul>
            {this.categoryNames.map((cat) => {
              return (
                <Link to="/" key={cat.length}>
                  <li
                    className={`cat-link ${
                      this.props.category === cat ? "acitve-cat" : ""
                    }`}
                    onClick={() => this.onChosseCatHandler(cat)}
                  >
                    <p>{cat}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="bag-section">
          <Link to="/">
            <img src="./images/bag-icon.png" alt="" />
          </Link>
        </div>
        <div className="cart-section">
          <div
            className="currency-icons-section"
            onClick={this.toggleCurrencyList.bind(this)}
          >
            <div className="currencyAmount">{this.props.currency}</div>
            <div className="currency">
              {this.state.showCurrency ? (
                <BsChevronUp size={10} />
              ) : (
                <BsChevronDown size={10} />
              )}
            </div>
          </div>

          <div
            onClick={this.showCartOverlay.bind(this)}
            className={`cart-icon ${
              this.props.cartItems.length > 0 ? "cart-badge-visible" : ""
            }`}
          >
            <BsCart2 size={20} />
            <div className="cart-badge">{this.numcerOfItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    category: state.category,
    cartItems: state.cartItems,
    productsList: state.productsList,
    query: state.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (curr) => dispatch(changeCurrency(curr)),
    getSelectedProductsLists: (cat) => dispatch(getSelectedProductsLists(cat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
