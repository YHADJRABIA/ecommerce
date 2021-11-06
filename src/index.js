import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { hydrate } from "./redux/cartSlice";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const getCartFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem("savedCart");
    if (persistedState) return JSON.parse(persistedState);
  } catch (e) {
    console.log(e);
  }
};

const cart = getCartFromLocalStorage();
if (cart) {
  store.dispatch(hydrate(cart));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Enables Redux testing with Cypress
if (window.Cypress) {
  window.store = store;
}
