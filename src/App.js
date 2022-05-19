import "react-toastify/dist/ReactToastify.css" // Notification styles
import "./styles/app.scss" // Styles

import { BrowserRouter as Router } from "react-router-dom" //Router

// Layout
import Header from "./components/Header/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"

import i18n from "./i18n/i18n" // Translation

require("dotenv").config() // Environement variables

function App() {
  return (
    <>
      <Router>
        <Header />
        <Body />
        <Footer />
      </Router>
    </>
  )
}

export default App
