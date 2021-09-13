import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  // Prefered theme stored in local storage
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Gets previously stored theme if it exists.
  function getInitialMode() {
    const isReturningUser = "dark" in localStorage; // Returns true if user already used the website.
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme(); // Gets user's colour preference.

    // If mode was saved ► return saved mode else get users general preference.
    return isReturningUser ? savedMode : userPrefersDark ? true : false;
  }

  // Checks for user's preference.
  function getPrefColorScheme() {
    return !window.matchMedia
      ? null
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
