import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../src/components/UI/Header/Header";
import ProductsPage from "./components/screens/PLP/ProductsPage";
import ProductDescription from "./components/screens/PDP/ProductDescription";
import { Categories } from "./components/Models/Data/Dummy";
import Cart from "./components/screens/Cart/Cart";

import { getProductsLists } from "./store/actions";

import "./App.css";

class App extends Component {
  state = { categories: undefined };

  componentDidMount() {
    this.setState({ categories: Categories });
    // console.log(this.state.categories);
  }
  render() {
    this.props.getProductsLists(Categories);
    console.log(this.state.categories);
    if (this.state.categories === undefined) {
      return <div>Loading</div>;
    }

    return (
      <div className="App">
        csts
        <Header
          categories={this.state.categories}
          style={{
            position: "fixed",
            top: 0,
            backgroundColor: "white",
            zIndex: 25,
            width: "80%",
          }}
        />
        <div>hi</div>
        <Switch>
          <Route exact path="/">
            <ProductsPage cats={Categories} />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/detials/:porductid">
            <ProductDescription />
          </Route>
        </Switch>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsLists: (list) => dispatch(getProductsLists(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
