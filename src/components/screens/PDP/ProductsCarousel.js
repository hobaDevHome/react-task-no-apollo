import React, { Component } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import ProdcutDetailsImage from './ProdcutDetailsImage';
import './ProductsCarousel.css';

export default class ProductsCarousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    this.state = {
      current_card: 0,
    };
  }
  onThumbClick(thumb) {
    this.props.onClick(thumb);
  }
  next() {
    if (this.state.current_card < (this.props.pics.length - 1) / 3) {
      this.setState({ current_card: this.state.current_card + 1 }, () => {
        this.card_container.style.transitionDuration = '0.5s';
        this.card_container.style.transform = `translateY(-${
          350 * this.state.current_card
        }px)`;
      });
    }
  }
  prev() {
    if (this.state.current_card > 0) {
      this.setState({ current_card: this.state.current_card - 1 }, () => {
        this.card_container.style.transitionDuration = '0.5s';
        this.card_container.style.transform = `translateY(${
          -350 * this.state.current_card
        }px)`;
      });
    }
  }
  render() {
    return (
      <div className="contianer">
        <FiChevronUp
          className={`up-arrow-c ${
            this.state.current_card < (this.props.pics.length - 1) / 3
              ? ''
              : 'arrows-off-c'
          }`}
          color="black"
          size={24}
          onClick={this.next}
        />
        <FiChevronDown
          className={`down-arrow-c ${
            this.state.current_card > 0 ? '' : 'arrows-off-c'
          }`}
          color="black"
          size={24}
          onClick={this.prev}
        />

        <div className="viewport">
          <div
            ref={(ref_id) => (this.card_container = ref_id)}
            className="carousel"
          >
            {this.props.pics.map((thumb) => (
              <ProdcutDetailsImage
                key={thumb.length}
                thumbSrc={thumb}
                onClick={() => this.onThumbClick(thumb)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
