import heroImg from "../images/heroimg.jpg"
import React from "react"
import MovieCard from "./MovieCard"
import loadingImg from "../images/30+fps.gif"


export default function FindFilms(props){
    const [searchValue, setSearchValue] = React.useState("")
    const [searchMemory, setSearchMemory] = React.useState("")
    const [movies, setMovies] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [movieHtml, setMovieHtml] = React.useState("")
    const [error, setError] = React.useState(false)
    let typingTimer


    React.useEffect(()=>{

        if(!searchValue){
          return 
        }
          fetch(`https://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                if(data.Response === "False"){
                  throw Error("No Movie Found")
                } else {
                  setError(false)
                }
              let movieList = []
              data.Search.forEach(movie=>{
                fetch(`https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}`)
                .then(res => res.json())
                .then(data => {
                  if(movieList.some(movie => movie.imdbID === data.imdbID)){
                    return
                  } 
                  else {
                    movieList.push(data)
                    setMovies(movieList)
                    getHTML()
                  }
                })
              })
            })
            .catch(err => {
              setError(true)
              console.log(err)
            })
        }, [searchMemory, searchValue])

        
        function getHTML(){
            const movieArr = movies.map(movie => {
              return <MovieCard props={{...movie}} addStorage={props.addStorage} watchlistStorage={props.watchlistStorage} removeStorage={props.removeStorage} key={movie.imdbID} />})
            setMovieHtml(movieArr)
            }

            function handleChange(e){
                const search = e.target.value
                clearTimeout(typingTimer)
                setLoading(true)
                setSearchValue(search)
                typingTimer = setTimeout(()=>{ 
                  setSearchMemory(searchValue)
                  setLoading(false)
                }, 2500)
              }
              function html(){ 
                  if(error && !loading){
                      return (
                        <div id="noData">
                          <h2>OOPS!</h2>
                          <p>Nothing was found, check your spelling!</p>
                        </div>
                      )
                  }
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
                  } else  {
                    return (
                      <div id="noData">
                        <i className="fa fa-film fa-6x"></i>
                        <p>Start Exploring</p>
                      </div>
                    )
              }}

        

    return (
        <div className="findfilms-page">
            <header className="header">
                <img className="hero-img" src={heroImg} />
                <div className="hero-title">
                <h1>Find your film</h1>
                <h2 className="hero__watchlist"  onClick={()=>props.setWatchlistPage(prev => !prev)}>My Watchlist</h2>
                </div>
                <div className="input-group">
                    <i className="fa fa-search"></i>
                    <input type="text" id="searchBar" placeholder="What are you looking for?" value={searchValue} onChange={handleChange} autoFocus  />
                    <button className="btn" type="submit" id="searchBtn" onClick={handleChange}>Search</button>
                </div>
            </header>
            <main> 
                {html()}
            </main>
        </div>
    )
}