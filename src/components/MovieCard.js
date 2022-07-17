import React from "react";
import NoMovie from "../images/nomovie.jpg";
export default function MovieCard(props) {
  const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID, Year } =
    props.props;
  const [watchlistStorage] = React.useState(props.watchlistStorage);
  const [inWatchlist, setInWatchlist] = React.useState(
    watchlistStorage.includes(imdbID) ? true : false
  );
  function toggle() {
    setInWatchlist((prev) => !prev);
    inWatchlist ? props.removeStorage(imdbID) : props.addStorage(imdbID);
  }

  return (
    <div className="movie-container container">
      <img
        className="movie-img"
        src={Poster !== "N/A" ? Poster : NoMovie}
        alt="A poster of the movie"
      />
      <div className="movie-content">
        <div className="movie-header">
          <h2 className="movie-title clear__bottom">{Title}</h2>
          <i className="fa fa-star clear__bottom"></i>
          <p className="movie-rating clear__bottom">{imdbRating}</p>
          <h3 className="movie-year clear__bottom">{Year}</h3>
        </div>
        <div className="movie-tags">
          <p className="movie-tag movie-time clear__bottom">{Runtime}</p>
          <p className="movie-tag movie-category clear__bottom">{Genre}</p>
          <div className=" movie-tag watchlist-add " onClick={toggle}>
            <i className="fa fa-plus"></i>
            <p className="clear__bottom">
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </p>
          </div>
        </div>
        <div className="movie-desc">
          <p>{Plot}</p>
        </div>
      </div>
    </div>
  );
}
