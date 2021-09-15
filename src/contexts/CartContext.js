import React, { useEffect, useReducer, useContext, createContext } from "react";
import axios from "axios"; // HTTP requests

const CartStateContext = createContext(); // Holds state of the Cart
const CartDispatchContext = createContext(); // Holds dispatch function

// Gets cart content from browser's local storage
const savedCart = JSON.parse(localStorage.getItem("cart"));
const savedCount = JSON.parse(localStorage.getItem("count"));
const savedTotal = JSON.parse(localStorage.getItem("total"));

export const initialState = {
  total: savedTotal || 0, // Total amount of money
  count: savedCount || 0, // Number of items in cart
  cart: savedCart || [], // Cart initially contains no items unless saved in Local Storage
  offers: [],
  discount: null, // To be substracted from total
};

// Computes discount based on API's return value
const computeDiscount = (state, offer) => {
  switch (offer.type) {
    case "percentage": {
      console.log(state.total * (offer.value / 100));
      return state.total * (offer.value / 100);
    }
    case "minus": {
      console.log(offer.value);
      return offer.value;
    }
    case "slice": {
      const nbSlice = Math.floor(state.total / offer.sliceValue);
      console.log(nbSlice * offer.value);
      return nbSlice * offer.value;
    }
    default:
      throw new Error(`Unknown action ${offer.type}`);
  }
};

// Finds most advantageous discount out of the 3 offers
const getBestDiscount = (state) => {
  return state.offers
    .map((offer) => ({
      offer,
      amount: computeDiscount(state, offer),
    }))
    .sort((a, b) => (a.amount < b.amount ? 1 : -1))[0];
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_DEALS":
      console.log("state", state.offers);
      return { ...state, offers: [...state.offers, action.payload.offers] };

    case "ADD_ITEM":
      // Set item's quantity to 1 if not contained in cart, otherwise increment it
      return !state.cart.find((item) => item.isbn === action.payload.isbn)
        ? {
            ...state,
            //discount: getBestDiscount(action.payload.offers),
            count: state.count + 1,
            total: state.total + action.payload.price,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          }
        : {
            ...state,
            //discount: getBestDiscount(action.payload.offers),
            count: state.count + 1,
            total: state.total + action.payload.price,
            cart: [
              ...state.cart.map((item) => {
                return item.isbn === action.payload.isbn
                  ? { ...item, quantity: item.quantity + 1 }
                  : item;
              }),
            ],
          };

    case "DECREMENT_QUANTITY":
      // If item's quantity is 1 remove from cart, otherwise decrement it
      return state.cart.find((item) => item.isbn === action.payload.isbn)
        .quantity === 1
        ? {
            ...state,
            count: state.count - 1,
            total: state.total - action.payload.price,
            cart: [
              ...state.cart.filter((item) => item.isbn !== action.payload.isbn),
            ],
          }
        : {
            ...state,
            count: state.count - 1,
            total: state.total - action.payload.price,
            cart: [
              ...state.cart.map((item) => {
                return item.isbn === action.payload.isbn
                  ? { ...item, quantity: item.quantity - 1 }
                  : item;
              }),
            ],
          };

    // Removing matching item
    case "REMOVE_ITEM":
      return {
        ...state,
        count: state.count - action.payload.quantity,
        total: state.total - action.payload.quantity * action.payload.price,
        cart: state.cart.filter((item) => item.isbn !== action.payload.isbn),
      };

    // Emptying cart
    case "CLEAR_CART":
      return initialState;

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

export const CartProvider = ({ children, stateInit }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  stateInit = state;

  // Saving / updating cart on local storage
  useEffect(() => {
    // Fetching discounts
    const fetchDeals = async (isbns) => {
      // Only fetches discounts if the card isn't empty
      if (state.cart.length !== 0) {
        try {
          const res = await axios.get(
            `https://henri-potier.techx.fr/books/${isbns.join(
              ","
            )}/commercialOffers`
          );
          console.log(res.data);
          dispatch({
            type: "GET_DEALS",
            payload: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchDeals(state.cart.map((item) => item.isbn));
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("count", JSON.stringify(state.count));
    localStorage.setItem("total", JSON.stringify(state.total));
  }, [state.cart, state.count, state.total]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
