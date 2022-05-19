import React, { useEffect } from "react"

/* Props from Nav component */
const BurgerMenu = ({ toggled, setToggled, navbar }) => {
  useEffect(() => {
    document.addEventListener("keydown", keyboardEvent, true)
    return () => {
      document.removeEventListener("keydown", keyboardEvent, true)
    }
  })

  // On/Off menu button
  const toggleMenu = () => setToggled(!toggled)

  // Closes menu if escape key pressed
  const keyboardEvent = e => {
    if (e.key === "Escape") {
      setToggled(false)
    }
  }

  return (
    <div
      className={`burger-icon + ${toggled ? "burger-toggled" : ""}`}
      onClick={toggleMenu}
      aria-label="Menu"
      data-testid="burger-menu"
      role="button"
      aria-controls="navigation"
    >
      {[1, 2, 3].map(i => (
        <div
          className={`burger-line-${i} ${navbar ? "active" : ""}`}
          key={i}
        ></div>
      ))}
    </div>
  )
}

export default BurgerMenu
