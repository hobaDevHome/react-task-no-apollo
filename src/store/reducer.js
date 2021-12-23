import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import CartItemModel from "../components/Models/CartItemModel";

const INITIAL_STATE = {
  query: [],
  currency: "$",
  category: "all",
  productsList: [],
  selectedList: [],
  cartItems: [],
  clickedAttributes: [],
  totalAmount: 0,
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  console.log("reducer called with", action);

  switch (action.type) {
    case "change_currency":
      return { ...state, currency: action.payload };

    case "get_products_list":
      return {
        ...state,
        productsList: action.payload[0],
        selectedList: action.payload[0],
        query: action.payload,
      };

    case "get_slelected_products_list":
      const newList = state.query.map((cat) => cat.name === action.payload);
      return { ...state, category: action.payload, selectedList: newList };

    case "add_cart_item":
      const addedProduct = action.payload;
      const prodPrice = addedProduct.prices;
      const prodTitle = addedProduct.name;
      const prodAttributes = addedProduct.attributes;
      const prodId = addedProduct.id;
      const prodGallery = addedProduct.gallery;

      const fouund = state.cartItems.find(
        (item) => item.id === addedProduct.id
      );
      const indexOfFound = state.cartItems.indexOf(fouund);

      if (fouund) {
        const updatedCartItem = new CartItemModel(
          state.cartItems[indexOfFound].quantity + 1,
          prodPrice,
          prodTitle,
          prodAttributes,
          prodId,
          prodGallery
        );
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.id === prodId ? updatedCartItem : el
          ),
        };
      } else {
        const newCartItem = new CartItemModel(
          1,
          prodPrice,
          prodTitle,
          prodAttributes,
          prodId,
          prodGallery
        );
        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
        };
      }

    case "delete_cart_item":
      const selectedCartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (selectedCartItem) {
        const currentQty = selectedCartItem.quantity;

        if (currentQty > 1) {
          const updatedCartItem = new CartItemModel(
            selectedCartItem.quantity - 1,
            selectedCartItem.productPrice,
            selectedCartItem.productTitle,
            selectedCartItem.attributes,
            selectedCartItem.id,
            selectedCartItem.gallery
          );
          return {
            ...state,
            cartItems: state.cartItems.map((el) =>
              el.id === selectedCartItem.id ? updatedCartItem : el
            ),
          };
        } else {
          return {
            ...state,
            cartItems: state.cartItems.filter((el) => el.id !== action.payload),
          };
        }
      }
      break;

    case "clac_total":
      let calculatedAmount = 0;
      const items = action.payload;
      const prodcusPricesList = items.map((cartItem) => {
        return { l: cartItem.productPrice, q: cartItem.quantity };
      });
      const amounts = prodcusPricesList.map((priceList) =>
        priceList.l.map((price) => {
          if (price.currency.symbol === state.currency) {
            calculatedAmount += price.amount * priceList.q;
            calculatedAmount = parseFloat(calculatedAmount).toFixed(2);
          }
        })
      );

      return {
        ...state,
        totalAmount: calculatedAmount,
      };

    case "change_attribute":
      const id = action.payload.id;
      const attribute = action.payload.attribute;
      const name = action.payload.name;
      const addClickedattribute = { id, attribute, name };
      const clickedFound = state.clickedAttributes.find((atr) => atr.id === id);
      if (!clickedFound) {
        return {
          ...state,
          clickedAttributes: [...state.clickedAttributes, addClickedattribute],
        };
      } else {
        return {
          ...state,
          clickedAttributes: state.clickedAttributes.map((att) =>
            att.id === id ? addClickedattribute : att
          ),
        };
      }

    default:
      return state;
  }
};
