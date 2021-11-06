# E-commerce

Harry Potter e-commerce book-purchasing app, developed as part of Xebia's technical assessment.

**The app may be accessed here: https://yhadjrabia.github.io/ecommerce/
⚠️ However, due to gh-pages' routing issues for multi-page apps:
• gh-pages won't allow to experience my redirecting feature whenever the user inputs an unrouted address (example: https://yhadjrabia.github.io/ecommerce/a41fd8gr1trdqd), which is otherwise supposed to display a special "404-not-found" page and redirect the user to the home page after 3 seconds.
• Refreshing the page from the cart page may result in a 404 error.
To not encounter such issues it is hence recommended to install the via npm. (refer to *Installation* in the *Setup* section)⚠️**

## Setup:

#### Installation:

```
cd ecommerce
npm install
```

#### Use:

```
npm start
```

#### Tests:

```
npm run cypress
```

## Upcoming features:

- Discount feature.
- Paypal cashout.

## Technologies:

- Functional ReactJS with hooks.
- Axios for HTTP requests to API.
- i18n for internationalization.
- Sass using the 7-1 pattern.
- Redux Toolkit for global state management (Respecting state immutability).
- Cypress for UI, localstorage and Redux store tests.

## Features:

- Fully responsive mobile-first website built entirely with Sass (No Bootstrap/Tailwind or other styling libraries).
- API consumption (displaying fetched data and filtering it through a search bar).
- Cart storing selected items and computing the total price according to applicable discounts.

## Bonus:

- ✓ Multiligual website using localstorage to save user preferences.
- ✓ Loading animations and toast notifications for better user experience.
- ✓ 404-not-found routing.
- ✓ Meta parameters (icon, description, link thumbnail).
- ✓ Cypress end-to-end tests.
