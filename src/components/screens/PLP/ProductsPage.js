import React, { Component } from "react";
import ProductItem from "./ProductItem";
import { connect } from "react-redux";
import "./ProductsPage.css";

class ProductsPage extends Component {
  state = { loaded: false };

  catNames = {
    tech: "Tech Category Products",
    clothes: "Clothes Category Products",
    all: "All Products",
  };

  render() {
    return (
      <div className="products">
        <div className="cat-name-containger">
          <p>{this.catNames[this.props.category]}</p>
        </div>
        <div className="product-list-contianer">
          {this.props.selectedList.products !== undefined &&
            this.props.selectedList.products.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  inStock={product.inStock}
                  inCart={false}
                  id={product.id}
                  product={product}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedList: state.selectedList,
    category: state.category,
  };
};

export default connect(mapStateToProps, null)(ProductsPage);
