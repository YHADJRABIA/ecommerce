import React from "react";

import { useTranslation } from "react-i18next"; // Translation

const LanguageToggler = () => {
  const { i18n, t } = useTranslation();

  // If English ► France's flag, else Great Britain's
  let flag = i18n.language === "fr" ? "gb" : "fr";

  const switchLanguage = (ln) => {
    // Saving preferred language to local storage
    localStorage.setItem("lang", JSON.stringify(i18n.language));
    return () => {
      i18n.changeLanguage(ln);
    };
  };

  return (
    <div className="lang-section">
      <h4>{t("switchLang")}</h4>
      <button
        title={t("language")}
        className="btn-primary"
        onClick={
          i18n.language === "fr" ? switchLanguage("en") : switchLanguage("fr")
        }
      >
        <img
          src={`https://flagcdn.com/w40/${flag}.png`}
          srcSet={`https://flagcdn.com/w80/${flag}.png 2x`}
          width="30"
          height="20"
          alt={t("flag")}
        />
        {t("click")}
      </button>
    </div>
  );
};

export default LanguageToggler;
