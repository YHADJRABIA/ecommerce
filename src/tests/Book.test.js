import React from "react";
import { screen, cleanup, fireEvent, render } from "@testing-library/react";
import { CartProvider } from "../contexts/CartContext";
import Book from "../components/Book";

// "Add to cart" button
const addToCartBtn = screen.getByTestId("add-to-cart");

const testBook = {
  isbn: "isbn",
  cover: "cover",
  price: 0.5,
  synopsis: ["synopsis"],
  title: "title",
};

const testState = {
  total: 0,
  count: 0,
  cart: [],
  offers: [],
  discount: null,
};

afterEach(cleanup);

it("component renders without crashing", () => {
  render(
    <CartProvider stateInit={testState}>
      <Book book={testBook} />
    </CartProvider>
  );
});

/* it("should add book upon button click", () => {
  render(
    <CartProvider stateInit={testState}>
      <Book book={testBook} />
    </CartProvider>
  );

  fireEvent.click(addToCartBtn);

  expect(testState.count).toEqual(1);
}); */
