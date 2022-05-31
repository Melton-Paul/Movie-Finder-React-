import React from "react"
import Watchlist from "./components/Watchlist"
import FindFilms from "./components/FindFilms"
import usePageLogic from "./hooks/usePageLogic"


export default function App() {
  const {
    setWatchlistPage, 
    watchlistStorage, 
    removeStorage, 
    addStorage, 
    watchlistPage} =  usePageLogic()

  return (
    <div>
      {watchlistPage ? 
      <Watchlist setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage}  removeStorage={removeStorage} /> : 
      <FindFilms setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage} addStorage={addStorage} removeStorage={removeStorage}  />}
    </div>
  )
}




