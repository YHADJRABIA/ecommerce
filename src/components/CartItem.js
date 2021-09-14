import React from "react";
import { useTranslation } from "react-i18next"; // Translation

import { useDispatchCart } from "../contexts/CartContext"; // Contexts

const CartItem = ({ item }) => {
  const dispatch = useDispatchCart();

  const { t } = useTranslation();
  const { title, cover, price, quantity } = item;

  // Removing item from cart
  const handleRemove = (item) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
  };

  // Decrementing item's quantity
  const handleDecrement = (item) => {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: item,
    });
  };

  // Incrementing item's quantity
  const handleIncrement = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <img
          className="cart-item-cover"
          src={cover}
          alt={title}
          title={title}
        />
        <h5 className="cart-item-title">{title}</h5>
      </div>

      <div className="cart-item-controls">
        <button
          data-testid="decrement-item"
          title={t("decrementItem")}
          className="btn-regular"
          onClick={() => handleDecrement(item)}
        >
          -
        </button>
        <div className="cart-item-price">
          <h4>
            {quantity} x {price.toFixed(2)} ={" "}
            <em>{(quantity * price).toFixed(2)}€</em>
          </h4>
        </div>
        <button
          data-testid="increment-item"
          title={t("incrementItem")}
          className="btn-regular"
          onClick={() => handleIncrement(item)}
        >
          +
        </button>
      </div>

      <button
        data-testid="remove-item"
        title={t("removeItem")}
        className="btn-secondary"
        onClick={() => handleRemove(item)}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default CartItem;
