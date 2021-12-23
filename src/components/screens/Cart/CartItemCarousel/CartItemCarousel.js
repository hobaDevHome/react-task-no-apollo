import React, { Component } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./CartItemCarousel.css";

export default class CartItemCarousel extends Component {
  state = { current: 0 };
  SliderData = this.props.cartItem.gallery;
  length = this.SliderData.length;
  nextSlide() {
    this.setState({
      current:
        this.state.current === this.length - 1 ? 0 : this.state.current + 1,
    });
  }

  prevSlide() {
    this.setState({
      current:
        this.state.current === 0 ? this.length - 1 : this.state.current - 1,
    });
  }

  render() {
    return (
      <section className="slider">
        <FiChevronLeft
          className={`left-arrow ${this.length > 1 ? "" : "arrows-off"}`}
          color="white"
          size={24}
          onClick={this.prevSlide.bind(this)}
        />
        <FiChevronRight
          className={`right-arrow ${this.length > 1 ? "" : "arrows-off"}`}
          color="white"
          size={24}
          onClick={this.nextSlide.bind(this)}
        />
        {this.SliderData.map((slide, index) => {
          return (
            <div
              className={
                index === this.state.current ? "slide active" : "slide"
              }
              key={index}
            >
              {index === this.state.current && (
                <img src={slide} alt="travel" className="slide-image" />
              )}
            </div>
          );
        })}
      </section>
    );
  }
}
