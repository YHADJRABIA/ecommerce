import React from "react";
import { useCart } from "../../contexts/CartContext"; // Contexts

import { useTranslation } from "react-i18next"; // Translation

const PriceContainer = () => {
  const { t } = useTranslation();
  const { total } = useCart();

  return (
    <div className="cart-total">
      <div className="cart-total-top">
        <h5 className="total-discount">
          <i className="fas fa-receipt"></i>
          {t("totalBeforeDiscounts")} <em>{total.toFixed(2)} € </em>
        </h5>
        <h5 className="total-discount">
          <i className="fas fa-tags"></i>
          {t("discounts")}
          <em> ?</em>
        </h5>
      </div>

      <h5 className="total-price">
        <i className="fas fa-cash-register"></i>
        {t("grandTotal")} <em>{total.toFixed(2)} €</em>
      </h5>
    </div>
  );
};

export default PriceContainer;
