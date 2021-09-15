import React from "react";

import { useTranslation } from "react-i18next"; // Translation

import CartImage from "../resources/CartImage"; // Svg

import { useCart } from "../contexts/CartContext"; // Contexts

// Components

import CartItems from "../components/Cart/CartItems";
import PriceContainer from "../components/Cart/PriceContainer";

const Cart = () => {
  const { cart } = useCart(); // Cart array
  const { t } = useTranslation();
  return (
    <div className="cart-page">
      {/* If cart is empty return svg */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <CartImage />
          <h3>{t("emptyCart")}</h3>
        </div>
      ) : (
        <>
          <CartItems />
          <PriceContainer />
        </>
      )}
    </div>
  );
};

export default Cart;
