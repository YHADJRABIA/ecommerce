import React, { useState, useEffect, createContext } from "react";

// API fetcher
import axios from "axios";

/*To be imported by components that want to access the data.
The components need to also import { useContext} from react to consume the data.*/
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching API data upon rendering
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://henri-potier.techx.fr/books")
        .then((response) => {
          console.log(response.data);
          setBooks(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        books,
        loading,
        search,
        setSearch,
        filteredBooks,
        setFilteredBooks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
