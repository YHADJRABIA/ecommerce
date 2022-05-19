import React, { useEffect } from "react"

import { useTranslation } from "react-i18next" // Translation

// Redux
import { useSelector, useDispatch } from "react-redux"
import { fetchDiscounts } from "../redux/cartSlice"

// Components
import CartImage from "../resources/CartImage" // Svg
import CartList from "../components/Cart/CartIList"
import PriceContainer from "../components/Cart/PriceContainer"
import Cashout from "../components/Cart/Checkout"

const Cart = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { cart, total } = useSelector(state => state.cart)

  /*   useEffect(() => {
    dispatch(fetchDiscounts(cart.map((item) => item.isbn)));
  }, [dispatch, cart]); */

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
          <CartList cart={cart} />
          <Cashout total={total} cart={cart} />
          <PriceContainer total={total} />
        </>
      )}
    </div>
  )
}

export default Cart
