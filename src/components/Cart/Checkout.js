import React, { useState, useEffect, useRef } from "react"

// Redux
import { useDispatch } from "react-redux"
import { clear_cart } from "../../redux/cartSlice"

import { useTranslation } from "react-i18next" // Translation
import { notify } from "../../utils/Notification" // Notifications

const Checkout = ({ total, cart }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [paidFor, setPaidFor] = useState(false)
  let paypalRef = useRef()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",

            purchase_units: [
              {
                description: "Books",
                amount: {
                  currency_code: "EUR",
                  value: total,
                },
              },
            ],

            payer: {
              address: {
                country_code: "FR",
              },
              phone: {
                phone_type: "MOBILE",
                phone_number: {
                  national_number: "14082508100",
                },
              },
            },
          })
        },

        // If successful transaction
        onApprove: async (data, actions) => {
          setLoading(true)
          await actions.order.capture()
          setPaidFor(true)
          dispatch(clear_cart())
          setLoading(false)
          notify(t("successfulTransaction"))
        },

        // If cancelled transaction
        onCancel: data => {
          setPaidFor(false)
          setLoading(false)
        },

        // If error
        onError: err => {
          console.log(err)
          setLoading(false)
        },
      })
      .render(paypalRef.current)
  }, [])

  return (
    <div className="checkout-section">
      <h4>⚠️{t("disclaimer")}</h4>

      <div className="paypal-container">
        <h2>{t("checkout")}</h2>
        <div ref={paypalRef} disabled={loading}></div>
      </div>
    </div>
  )
}

export default Checkout
