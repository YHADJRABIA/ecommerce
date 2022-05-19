import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

// Svg
import NotFoundImage from "../resources/NotFoundImage"

import { useTranslation } from "react-i18next" // Translation

const NotFound = () => {
  const { t } = useTranslation()
  const [counter, setCounter] = useState(3)
  const history = useHistory()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    }

    if (counter === 0) {
      history.push("/ecommerce")
    }
    // Should unsubscribe to counter
    return () => {
      isMounted = false
    }
  }, [counter, history])
  return (
    <div className="page-not-found">
      <NotFoundImage />
      <h3> {t("pageNotFound")}</h3>
      <h4>
        {t("redirection")} {counter} sec...
      </h4>
    </div>
  )
}

export default NotFound
