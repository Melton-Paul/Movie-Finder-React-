import React from "react"
import heroImg from "./images/heroimg.jpg"
import MovieCard from "./MovieCard"

export default function App() {
  const [loading, setLoading] = React.useState(false)
  const [movies, setMovies] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [movieHtml, setMovieHtml] = React.useState("")
  let typingTimer

  React.useEffect(()=>{
    clearTimeout(typingTimer)
    setLoading(true)
    typingTimer = setTimeout(()=>{
      setLoading(false)
      fetch(`https://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}`)
        .then(res => res.json())
        .then(data => {
          let movieList = []
          data.Search.forEach(movie=>{
            console.log(movie.Title)
            fetch(`https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}`)
            .then(res => res.json())
            .then(data => {
              movieList.push(data)
            })
          })
          setMovies(movieList)
          getHTML()
          console.log(movies)
        })
      }, 2000)
    }, [searchValue])
    
    
    console.log(movies)
    function getHTML(){
      setMovieHtml(()=>{
        return movies.map(movie => {
          return <MovieCard props={{...movie}} />
        })
      }) 
    }
    
    function handleChange(event){
      setSearchValue(event.target.value)
      console.log(searchValue)
    }


  return (
    <div>
      <header className="header">
          <img className="hero-img" src={heroImg} />
          <div className="hero-title">
            <h1>Find Your Film</h1>
            <h2 className="hero__watchlist">My Watchlist</h2>
          </div>
          <div class="input-group">
                <i class="fa fa-search"></i>
                <input type="text" id="searchBar" placeholder="What are you looking for?" onChange={handleChange} value={searchValue} autofocus />
                <button class="btn" type="submit" id="searchBtn">Search</button>
            </div>
      </header>
      <main>
        {movieHtml}
      </main>
    </div>
  )
}


