import React from "react"
import heroImg from "./images/heroimg.jpg"
import MovieCard from "./MovieCard"
import loadingImg from "./images/30+fps.gif"

export default function App() {
  const [loading, setLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [searchMemory, setSearchMemory] = React.useState("")
  const [movieHtml, setMovieHtml] = React.useState("")
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
      <header className="header">
          <img className="hero-img" src={heroImg} />
          <div className="hero-title">
            <h1>Find Your Film</h1>
            <h2 className="hero__watchlist">My Watchlist</h2>
          </div>
          <div className="input-group">
                <i class="fa fa-search"></i>
                <input type="text" id="searchBar" placeholder="What are you looking for?" onChange={handleChange} value={searchValue} autoFocus />
                <button className="btn" type="submit" id="searchBtn">Search</button>
            </div>
      </header>
      <main> 
        {html()}
      </main>
    </div>
  )
}


