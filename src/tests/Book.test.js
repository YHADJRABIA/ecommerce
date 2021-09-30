import React from "react";
import { screen, cleanup, fireEvent, render } from "@testing-library/react";
import { CartProvider } from "../contexts/CartContext";
import { initReactI18next, useTranslation } from "react-i18next"; // Translation
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import Book from "../components/Home/Book";

/* const mMock = jest.fn();

jest.mock("react-i18next", () => {
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  const originalI18next = jest.requireActual("react-i18next");
  return {
    ...originalI18next,

    useTranslation: jest
      .fn()
      .mockImplementation(originalI18next.useTranslation),
  };
}); */

const mockBook = {
  isbn: "isbn",
  cover: "cover",
  price: 0.5,
  synopsis: ["synopsis"],
  title: "title",
};

const mockState = {
  total: 0,
  count: 0,
  cart: [],
  offers: [],
  discount: null,
};

/* afterEach(cleanup); */
describe("Book component", () => {
  it("component renders without crashing", () => {
    render(
      <CartProvider stateInit={mockState}>
        <Book book={mockBook} />
      </CartProvider>
    );
  });

  it("adds book upon button click", () => {
    const { getByText } = render(
      <CartProvider stateInit={mockState}>
        <Book book={mockBook} />
      </CartProvider>
    );

    const addToCartBtn = getByText("Ajouter au panier");

    fireEvent.click(addToCartBtn);
    expect(mockState.cart).toHaveLength(1);
    //expect(mockState.count).toEqual(1);
  });

  /*   it("should add book upon button click", () => {
    const { t } = useTranslation();
    // "Add to cart" button
    const addToCartBtn = screen.getByTestId("add-to-cart");
    render(
      <I18nextProvider i18n={i18n}>
        <CartProvider stateInit={testState}>
          <Book book={testBook} />
        </CartProvider>
      </I18nextProvider>
    );

    fireEvent.click(addToCartBtn);

    expect(testState.count).toEqual(1);
  }); */
});
