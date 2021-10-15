import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next"; // Translation

// Redux
import { useSelector } from "react-redux";

/* Components */
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const { count } = useSelector((state) => state.cart); // Number of items contained in cart

  const { t } = useTranslation();
  const menuRef = useRef(); // To detect if user clicks outside of the menu area, close the menu if so
  const navItems = [
    {
      title: t("catalog"),
      url: "/ecommerce",
      cName: "nav-links",
    },
    {
      title: t("cart"),
      url: "/ecommerce/cart",
      cName: "nav-links",
      count,
    },
  ];

  const [toggled, setToggled] = useState(false);
  const [navbar, setNavbar] = useState(false);

  // Subscribing to events when components mounts then unsubscribing if component unmounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    window.addEventListener("scroll", toggleBackground);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      window.addEventListener("scroll", toggleBackground);
    };
  });

  /* Modifies nav's background if user's verical scroll >= nav's height */
  const toggleBackground = () => {
    window.scrollY >= 80 ? setNavbar(true) : setNavbar(false);
  };

  // Closes menu if user clicks outside of menu
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setToggled(false);
    }
  };

  return (
    <nav ref={menuRef} className={`NavItems ${navbar ? "active" : ""}`}>
      <div className={`nav-logo ${navbar ? "active" : ""}`}>
        <Link to="/ecommerce" title="Logo">
          <h2> {t("hp")}</h2> <i className="fas fa-magic"></i>
        </Link>
      </div>

      {/*--- Phone only ---*/}
      <BurgerMenu toggled={toggled} setToggled={setToggled} navbar={navbar} />
      {/*--------*/}

      <ul className={`nav-menu ${toggled ? "toggled" : ""}`}>
        {navItems.map((item, id) => (
          <li key={id}>
            <Link
              to={item.url}
              title={item.title}
              className={`${item.cName} ${navbar ? "active" : ""}`}
              onClick={() => setToggled(false)}
            >
              {item.title}
              {item.count ? (
                <div className="cart-badge">
                  <small>{item.count}</small>
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
