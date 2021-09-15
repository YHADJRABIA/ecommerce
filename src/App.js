import "react-toastify/dist/ReactToastify.css"; // Notification styles
import "./styles/app.scss"; // Styles

import { BrowserRouter as Router } from "react-router-dom"; //Router

// Contexts
import { DataProvider } from "./contexts/DataContext";
import { CartProvider } from "./contexts/CartContext";

// Layout
import Header from "./components/Header/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import i18n from "./i18n/i18n"; // Translation

function App() {
  return (
    <>
      <DataProvider>
        <CartProvider>
          <Router>
            <Header />
            <Body />
            <Footer />
          </Router>
        </CartProvider>
      </DataProvider>
    </>
  );
}

export default App;
