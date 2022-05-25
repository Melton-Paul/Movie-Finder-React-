import React from "react"
import MovieCard from "./components/MovieCard"
import loadingImg from "./images/30+fps.gif"
import Watchlist from "./components/Watchlist"
import FindFilms from "./components/FindFilms"

export default function App() {
  const [watchlistStorage, setWatchlistStorage] = React.useState(JSON.parse(window.localStorage.getItem("watchlist")) || [])
  const [watchlistPage, setWatchlistPage ] = React.useState(JSON.parse(window.localStorage.getItem("page")))

  function addStorage(id){
    setWatchlistStorage(prev => {
      return [...prev, id]
    })
  }
  
  function removeStorage(id){
    const location = watchlistStorage.indexOf(id)
    const arr = watchlistStorage
    arr.splice(location, 1)
    setWatchlistStorage(arr)
    window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage))
    if(watchlistPage){
    document.location.reload()}
  }

  window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage))
  window.localStorage.setItem("page", JSON.stringify(watchlistPage))

  return (
    <div>
      {watchlistPage ? 
      <Watchlist setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage}  removeStorage={removeStorage} MovieCard={MovieCard} /> : 
      <FindFilms loadingImg={loadingImg} setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage} addStorage={addStorage} removeStorage={removeStorage}  />}
    </div>
  )
}




