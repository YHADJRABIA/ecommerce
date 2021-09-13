import React from "react";
import { useTranslation } from "react-i18next"; // Translation

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="loading-container">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>{t("nowLoading")}</h2>
    </div>
  );
};

export default Loading;
