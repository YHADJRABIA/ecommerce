import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../locales/en.json"
import fr from "../locales/fr.json"

const isReturningUser = "lang" in localStorage // Returns true if user already used the website.
const savedLanguage = JSON.parse(localStorage.getItem("lang")) // Get saved language from previous use.

// Get previously used language in case of returning user or set language to French by default.
const language = isReturningUser ? savedLanguage : "fr"

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  keyseparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
