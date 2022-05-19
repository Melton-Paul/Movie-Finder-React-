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
  const [movieHtml, setMovieHtml] = React.useState("")
  const [watchlistPage, setWatchlistPage ] = React.useState(false)
  let typingTimer

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
            })
          })
          setMovies(movieList)
          getHTML()
        })
    }, [searchMemory])
    
    
    function getHTML(){
      if(movies){
      setMovieHtml(()=>{
        return movies.map(movie => {
          return <MovieCard props={{...movie}} />
        })
      }) }
    }
    
    function handleChange(event){
      clearTimeout(typingTimer)
      setLoading(true)
      setSearchValue(event.target.value)
      typingTimer = setTimeout(()=>{ 
        setSearchMemory(searchValue)
        setLoading(false)
      }, 1500)
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


  return (
    <div>
      {watchlistPage ? 
      <Watchlist setWatchlistPage={setWatchlistPage} /> : 
      <FindFilms handleChange={handleChange} searchValue={searchValue} setWatchlistPage={setWatchlistPage} html={html} />}
    </div>
  )
}


