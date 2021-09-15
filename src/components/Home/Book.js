import React from "react";

import { useTranslation } from "react-i18next"; // Translation

import { useDispatchCart } from "../../contexts/CartContext"; // Contexts

import { notify } from "../../utils/Notification"; // Notifications

const Book = ({ book }) => {
  const dispatch = useDispatchCart();

  const { t } = useTranslation();

  // Adding item to cart
  const handleClick = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
    notify(t("addedItem"));
  };

  return (
    <div className="book">
      <div className="book-image">
        <img
          className="book-cover"
          title={book.title}
          src={book.cover}
          alt={book.title}
        />
        <div className="book-overlay" title={book.title}>
          <h3 className="book-availablity">{t("inStock")}</h3>
        </div>
      </div>
      <div className="book-text">
        <h4 className="book-title">{book.title}</h4>
        <h4 className="book-price">
          {t("price")} : <em>{book.price.toFixed(2)} €</em>
        </h4>

        <button
          id={book.isbn}
          className="btn-primary"
          onClick={() => handleClick(book)}
          data-testid="add-to-cart"
        >
          <i className="fas fa-cart-arrow-down"></i>
          {t("addToCart")}
        </button>
      </div>
    </div>
  );
};

export default Book;
