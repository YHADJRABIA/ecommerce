import React, { useEffect, useContext } from "react";

import { useTranslation } from "react-i18next"; // Translation

import { ToastContainer } from "react-toastify"; // Notifications

import NotFoundImage from "../resources/NotFoundImage"; // Svg

import { DataContext } from "../contexts/DataContext"; // Contexts

import Book from "./Book"; // Components

const BookList = ({ books }) => {
  const { t } = useTranslation();
  const { filteredBooks, search, setFilteredBooks } = useContext(DataContext);

  useEffect(() => {
    // Rerendering the data 0.25 secs after user's input
    const filterDebounce = setTimeout(() => {
      setFilteredBooks(
        books.filter((book) => book.title.toLowerCase().includes(search))
      );
    }, 250);

    return () => clearTimeout(filterDebounce);
  }, [search, books, setFilteredBooks]);

  return (
    <div className="booklist-container">
      <ToastContainer limit={2} />;
      <ul>
        {filteredBooks.length === 0 && search.length !== 0 ? (
          <div className="book-not-found">
            <NotFoundImage />
            <h3>{t("bookNotFound")}</h3>
          </div>
        ) : (
          filteredBooks.map((book, id) => (
            <li key={id}>
              <Book book={book} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BookList;
