import React from "react";

import { useCart } from "../contexts/CartContext"; // Contexts

// Components
import CartItem from "../components/CartItem";

const CartList = () => {
  const { cart } = useCart(); // Cart array

  // Non-repetitive items
  const items = cart.filter(
    (v, i, a) => a.findIndex((item) => item.isbn === v.isbn) === i
  );

  return (
    <div className="cart-items">
      <ul>
        {items.map((item, id) => (
          <li key={id}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
