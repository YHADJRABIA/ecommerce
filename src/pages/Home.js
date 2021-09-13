import React, { useEffect, useContext } from "react";

import { DataContext } from "../contexts/DataContext"; // Contexts

// Components
import Loading from "../components/Loading";
import Searchbar from "../components/Searchbar";
import BookList from "../components/BookList";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const { books, loading } = useContext(DataContext);

  useEffect(() => {}, []);

  return (
    <>
      <HeroBanner />
      <div className="home-page">
        {/* Loading animation if API data hasn't been gotten yet */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <Searchbar />
            <BookList books={books} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
