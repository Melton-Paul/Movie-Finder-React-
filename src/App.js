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
  const [watchlistStorage, setWatchlistStorage] = React.useState(JSON.parse(window.localStorage.getItem("watchlist")) || [])
  const [watchlistHtml, setWatchlistHtml] = React.useState("")
  const [watchlist, setWatchlist] = React.useState([])
  const [movieHtml, setMovieHtml] = React.useState("")
  const [watchlistPage, setWatchlistPage ] = React.useState(false)
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
            })
          })
          setMovies(movieList)
          getHTML(setMovieHtml, movies)
        })
    }, [searchMemory])

    React.useEffect(()=>{
      let movieList = []
      watchlistStorage.forEach(id => {
        fetch(`https://www.omdbapi.com/?apikey=9980ac75&i=${id}&`)
          .then(res => res.json())
          .then(data => {
            movieList.push(data)
          })
          setWatchlist(movieList)
          getHTML(setWatchlistHtml, watchlist)
      })

    }, [watchlistPage])
    console.log(watchlistHtml)
    
    
    function getHTML(setOption, arr){
      const watchlistRender = setOption === setMovieHtml ? false : true
      setOption(()=>{
        return arr.map(movie => {
          return <MovieCard props={{...movie}} addStorage={addStorage} removeStorage={removeStorage} watchlistRender={watchlistRender}/>
        })
      }) 

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

    function addStorage(id){
      setWatchlistStorage(prev => {
        return [...prev, id]
      })
    }
    window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage))

    function removeStorage(id){
        console.log("removed")
        const location = watchlistStorage.indexOf(id)
        const arr = watchlistStorage
        const spliced = arr.splice(location, 1)
        setWatchlistStorage(spliced)
        // window.localStorage.setItem("watchlist", watchlistStorage)
        // console.log(location)
      // setWatchlistStorage(prev => {
      //   return prev.map(movie => {
      //     console.log( movie.imdbID === id ? [...prev] : [...prev, movie] )
      //     return [...prev, movie]
      //   })
      // })
      // window.localStorage.setItem("watchlist", watchlistStorage)
    }
  return (
    <div>
      {watchlistPage ? 
      <Watchlist setWatchlistPage={setWatchlistPage} watchlistStorage={watchlistStorage} removeStorage={removeStorage} MovieCard={MovieCard} watchlistHtml={watchlistHtml} /> : 
      <FindFilms handleChange={handleChange} searchValue={searchValue} setWatchlistPage={setWatchlistPage} html={html} />}
    </div>
  )
}


