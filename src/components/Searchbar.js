import React, { useContext, useEffect } from "react";

// Contexts
import { DataContext } from "../contexts/DataContext";

const Searchbar = () => {
  const { setSearch } = useContext(DataContext);

  // Sets filter value to user's input
  const handleSearch = (searchValue) => {
    setSearch(searchValue.toLowerCase());
  };

  // Voids search value upon rendering to prevent bugs
  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <div className="search-bar">
      <i className="fa fa-search"></i>
      <input
        data-testid="search-value"
        autoComplete="off"
        autoFocus
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        id="search-value"
        placeholder="Henri Potier..."
        name="search-bar"
      />
    </div>
  );
};

export default Searchbar;
