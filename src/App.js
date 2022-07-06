import React from "react";
import { Routes, Route } from "react-router-dom";
import FindFilms from "./components/FindFilms/FindFilms";
import Watchlist from "./components/Watchlist";
import usePageLogic from "./hooks/usePageLogic";

export default function App() {
  const { watchlistStorage, removeStorage, addStorage } = usePageLogic();
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(window.localStorage.getItem("darkMode")) || false
  );

  const findFilms = (
    <FindFilms
      watchlistStorage={watchlistStorage}
      removeStorage={removeStorage}
      addStorage={addStorage}
    />
  );

  const styles = {
    right: darkMode ? "50%" : "4%",
  };

  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  return (
    <>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mode__toggle"
      >
        <i className={`fa fa-solid ${darkMode ? "fa-moon" : "fa-sun"}`}></i>
        <span style={styles} className="circle"></span>
      </button>
      <Routes>
        <Route path="/" element={findFilms} />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlistStorage={watchlistStorage}
              removeStorage={removeStorage}
            />
          }
        />
        <Route path="*" element={findFilms} />
      </Routes>
    </>
  );
}
