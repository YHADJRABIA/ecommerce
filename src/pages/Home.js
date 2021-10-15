import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../redux/booksSlice";

// Components
import Loading from "../components/Loading";
import Searchbar from "../components/Home/Searchbar";
import BookList from "../components/Home/BookList";
import HeroBanner from "../components/Home/HeroBanner";

const Home = () => {
  const dispatch = useDispatch();
  const { status, books, search } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({}));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeroBanner />
      <div className="home-page">
        {/* Loading animation if API data hasn't been gotten yet */}
        {status === "loading" ? (
          <Loading />
        ) : (
          <>
            <Searchbar />
            <BookList books={books} search={search} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
