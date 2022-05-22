import React from "react"
import MovieCard from "./components/MovieCard"
import loadingImg from "./images/30+fps.gif"
import Watchlist from "./components/Watchlist"
import FindFilms from "./components/FindFilms"

export default function App() {
  const [loading, setLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [searchMemory, setSearchMemory] = React.useState("")
  const [watchlistStorage, setWatchlistStorage] = React.useState(JSON.parse(window.localStorage.getItem("watchlist")))
  const [movieHtml, setMovieHtml] = React.useState("")
  const [watchlistPage, setWatchlistPage ] = React.useState(JSON.parse(window.localStorage.getItem("page")))
  let typingTimer
  console.log(watchlistStorage)
  console.log(localStorage)
  React.useEffect(()=>{
    if(!searchValue){
      return 
    }
      fetch(`https://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}`)
        .then(res => res.json())
        .then(data => {
          let movieList = []
          data.Search.forEach(movie=>{
            fetch(`https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}`)
            .then(res => res.json())
            .then(data => {
              movieList.push(data)
              console.log(data)
            })
          })
          console.log(movieList)
          setMovies(movieList)
          getHTML()
          console.log(movies)
        })
    }, [searchMemory])
    
    
  function getHTML(){
    const movieArr = movies.map(movie => {
      return <MovieCard props={{...movie}} addStorage={addStorage} watchlistStorage={watchlistStorage} removeStorage={removeStorage} />})
      console.log(movieArr)
    setMovieHtml(movieArr)
    }

  
  function handleChange(event){
    clearTimeout(typingTimer)
    setLoading(true)
    setSearchValue(event.target.value)
    typingTimer = setTimeout(()=>{ 
      setSearchMemory(searchValue)
      setLoading(false)
    }, 2500)
  }

  function html(){ 
    if(searchValue){
      if(loading){
        return ( 
          <div id="noData">
            <img className="loading" src={loadingImg} />
            <p>Fetching Movies</p>
          </div> 
        ) 
      } else {
        return movieHtml
      }
      } else {
        return (
          <div id="noData">
            <i className="fa fa-film fa-6x"></i>
            <p>Start Exploring</p>
          </div>
        )
  }}

  function addStorage(id){
    setWatchlistStorage(prev => {
      return [...prev, id]
    })
  }
  
  function removeStorage(id){
    console.log("removed")
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
      <Watchlist setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage}  removeStorage={removeStorage} MovieCard={MovieCard} getHTML={getHTML}/> : 
      <FindFilms handleChange={handleChange} searchValue={searchValue} setWatchlistPage={setWatchlistPage} html={html} />}
    </div>
  )
}


