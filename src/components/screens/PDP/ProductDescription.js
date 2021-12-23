import React, { Component } from 'react';

import ProdcutMainImage from './ProductMainImage';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddToCartComp from '../../UI/AddToCartComp/AddToCartComp';
import SizesAtributes from './SizesAtributes';
import { changeAttrubute } from '../../../store/actions';
import ProductsCarousel from './ProductsCarousel';

import './ProductDescription.css';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.onThumbClickHandler = this.onThumbClickHandler.bind(this);
    this.itemInCartCheck = this.itemInCartCheck.bind(this);
    this.getOwnCartNoOfItems = this.getOwnCartNoOfItems.bind(this);

    this.state = { id: undefined, currentImage: undefined, noOfItmesInCart: 1 };
  }
  selecteProduct = {};
  price = 0;
  attributes;
  currentImage;

  getOwnCartNoOfItems(quantity) {
    this.setState({ noOfItmesInCart: quantity });
  }

  componentDidMount() {
    const sentId = this.props.match.params.porductid;
    this.setState({ id: sentId });
  }
  itemInCartCheck() {
    const found = this.props.cartItems.find((el) => el.id === this.state.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  }
  onThumbClickHandler(thumb) {
    this.setState({ currentImage: thumb });
  }
  render() {
    if (
      this.state.id !== undefined &&
      this.props.productsList.products !== undefined
    ) {
      this.selecteProduct = this.props.productsList.products.find(
        (prod) => prod.id === this.state.id
      );

      this.detailsImages = this.selecteProduct.gallery;
      this.currentImage = this.detailsImages[0];
      this.price = this.selecteProduct.prices.find(
        (price) => price.currency.symbol === this.props.currency
      ).amount;

      this.attributes = this.selecteProduct.attributes[0];

      return (
        <div className="main">
          <div className="prodcut-desc-container">
            <div className="details-pic-div">
              <ProductsCarousel
                pics={this.selecteProduct.gallery}
                onClick={this.onThumbClickHandler}
              />
            </div>
            <div className="product-img-div">
              <ProdcutMainImage
                mainImage={
                  this.state.currentImage === undefined
                    ? this.currentImage
                    : this.state.currentImage
                }
              />
            </div>
            <div className="prodcut-data-div">
              <div className="prod-title">{this.selecteProduct.name}</div>
              <SizesAtributes
                attributes={this.attributes}
                sentItme={this.selecteProduct}
                id={this.state.id}
              />

              <div className="size-desc">PRICE:</div>
              <div className="price-amount-desc">{`${this.props.currency} 
              ${
                +Math.round(this.price * this.state.noOfItmesInCart * 100) / 100
              }`}</div>
              <AddToCartComp
                sentItem={this.selecteProduct}
                getOwnCartNoOfItems={this.getOwnCartNoOfItems}
              />
            </div>
          </div>
          <p className="prod-long-desc">
            <span
              dangerouslySetInnerHTML={{
                __html: this.selecteProduct.description.replace(
                  /(<? *script)/gi,
                  'illegalscript'
                ),
              }}
            />
          </p>
        </div>
      );
    }

    return <div>Loadidng</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    productsList: state.productsList,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute) =>
      dispatch(changeAttrubute(id, attribute)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDescription));
