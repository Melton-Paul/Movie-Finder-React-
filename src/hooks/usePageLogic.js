import React from "react";

export default function usePageLogic() {
  const [watchlistStorage, setWatchlistStorage] = React.useState(
    JSON.parse(window.localStorage.getItem("watchlist")) || []
  );

  function addStorage(id) {
    setWatchlistStorage((prev) => {
      return [...prev, id];
    });
  }
  window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage));

  function removeStorage(id) {
    const location = watchlistStorage.indexOf(id);
    const arr = watchlistStorage;
    arr.splice(location, 1);
    setWatchlistStorage(arr);
    window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage));
  }

  return { watchlistStorage, removeStorage, addStorage };
}
