import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API fetcher
import axios from "axios";

// Gets cart content from browser's local storage

const savedCart = JSON.parse(localStorage.getItem("savedCart")) || [];

const initialState = {
  status: null,
  error: null,
  total: savedCart.total || 0, // Total amount of money
  count: savedCart.count || 0, // Number of items in cart
  cart: savedCart.cart || [], // Cart initially contains no items unless saved in Local Storage
  offers: savedCart.offers || [],
  discount: null, // To be substracted from total
};

export const fetchDiscounts = createAsyncThunk(
  "discounts/fetchDiscounts",
  async (isbns, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PUBLIC_DATA_URL}/${isbns.join(
          ","
        )}/commercialOffers`
      );
      return data;
    } catch (err) {
      console.log(err.reponse.data);
      return rejectWithValue("An error occured.");
    }
  }
);

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

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    hydrate: (action) => {
      // do not do state = action.payload it will not update the store
      return action.payload;
    },
    get_deals: (state, action) => {
      return { ...state, offers: [...state.offers, action.payload.offers] };
    },

    add_item: (state, action) => {
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
    },

    decrement_quantity: (state, action) => {
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
    },

    remove_item: (state, action) => {
      return {
        ...state,
        count: state.count - action.payload.quantity,
        total: state.total - action.payload.quantity * action.payload.price,
        cart: state.cart.filter((item) => item.isbn !== action.payload.isbn),
      };
    },

    clear_cart: (state) => {
      return {
        ...state,
        total: 0,
        count: 0,
        cart: [],
        offers: [],
        discount: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.status = "success";
        /*   state.offers = [
          ...state.offers.filter((offer) => offer === action.payload),
          action.payload,
        ]; */
      })
      .addCase(fetchDiscounts.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {
  hydrate,
  get_deals,
  add_item,
  decrement_quantity,
  remove_item,
  clear_cart,
} = cartSlice.actions;

export default cartSlice.reducer;
