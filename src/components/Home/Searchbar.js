import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { search_books } from "../../redux/booksSlice";

const Searchbar = () => {
  const dispatch = useDispatch();

  // Sets search value to user's input
  const handleSearch = (e) => {
    dispatch(search_books(e.toLowerCase()));
  };

  // Voids search value upon rendering to prevent bugs
  useEffect(() => {
    dispatch(search_books(""));
  }, [dispatch]);

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
