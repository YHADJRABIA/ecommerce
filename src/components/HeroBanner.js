import React from "react";

import { useTranslation } from "react-i18next"; // Translation

import HeroImage from "../resources/HeroImage"; // Svg

import LanguageToggler from "./LanguageToggler"; // Components

const HeroBanner = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="hero-container">
        <div className="hero-banner">
          <HeroImage />
          <div className="hero-text">
            <h1 className="hero-title">{t("heroTitle")}</h1>
            <h3 className="hero-content">{t("heroContent")}</h3>
          </div>
        </div>
        <LanguageToggler />
      </div>
      <svg
        className="border-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f1f1f1"
          fillOpacity="1"
          d="M0,128L48,133.3C96,139,192,149,288,133.3C384,117,480,75,576,58.7C672,43,768,53,864,80C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default HeroBanner;
