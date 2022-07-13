import heroImg from "../../images/heroimg.jpg";
import React from "react";
import MovieCard from "../MovieCard";
import loadingImg from "../../images/30+fps.gif";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function FindFilms(props) {
  const [movies, setMovies] = React.useState([]);
  const [searchMemory, setSearchMemory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  window.scrollTo(0, 0);

  React.useEffect(() => {
    setPage(1);
  }, [searchMemory]);

  React.useEffect(() => {
    if (!searchMemory) {
      return;
    }

    setLoading(true);

    setMovies([]);
    fetch(
      `https://www.omdbapi.com/?apikey=9980ac75&s=${searchMemory}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setLoading(false);
          throw Error("No Movie Found");
        } else {
          setError(false);
        }
        data.Search.forEach((movie) => {
          fetch(
            `https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}&plot=short`
          )
            .then((res) => res.json())
            .then((data) => {
              setMovies((prev) => {
                return [...prev, data];
              });
            });
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [searchMemory, page]);

  const filteredArr = Array.from(new Set(movies.map(JSON.stringify))).map(
    JSON.parse
  );

  const movieHtml = filteredArr.map((movie) => {
    return (
      <MovieCard
        props={{ ...movie }}
        addStorage={props.addStorage}
        watchlistStorage={props.watchlistStorage}
        removeStorage={props.removeStorage}
        key={movie.imdbID}
      />
    );
  });

  function html() {
    if (error && !loading) {
      return (
        <div id="noData">
          <h2>OOPS!</h2>
          <p>Nothing was found, check your spelling!</p>
        </div>
      );
    }
    if (searchMemory) {
      if (loading) {
        return (
          <div id="noData">
            <img className="loading" src={loadingImg} alt="" />
            <p>Fetching Movies</p>
          </div>
        );
      } else {
        return (
          <>
            {movieHtml}
            <div className="btn-container">
              <button onClick={() => setPage((prev) => prev - 1)}>&lt;</button>
              <span>Page {page}</span>
              <button onClick={() => setPage((prev) => prev + 1)}>&gt;</button>
            </div>
          </>
        );
      }
    } else {
      return (
        <div id="noData">
          <i className="fa fa-film fa-6x"></i>
          <p>Start Exploring</p>
        </div>
      );
    }
  }

  return (
    <div className="findfilms-page">
      <header className="header">
        <img className="hero-img" src={heroImg} alt="" />
        <div className="hero-title">
          <h1>Find your film</h1>
          <Link className="hero__watchlist link" to="/watchlist">
            My Watchlist
          </Link>
        </div>
        <SearchInput setSearchMemory={setSearchMemory} />
      </header>
      <main>{html()}</main>
    </div>
  );
}
