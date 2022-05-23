import heroImg from "../images/heroimg.jpg"
import React from "react"
import MovieCard from "./MovieCard"


export default function FindFilms(props){
    const [searchValue, setSearchValue] = React.useState("")
    const [movies, setMovies] = React.useState([])
    const [loading, setLoading] = React.useState(false)
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
                  console.log(data)
                  setMovies(movieList)
                  getHTML()
                })
              })
              console.log(movieList)
              console.log(movies)
            })
        }, [loading])
        
        function getHTML(){
            const movieArr = movies.map(movie => {
              return <MovieCard props={{...movie}} addStorage={props.addStorage} watchlistStorage={props.watchlistStorage} removeStorage={props.removeStorage} />})
              console.log(movieArr)
            setMovieHtml(movieArr)
            }

            function handleChange(){
                const search = document.getElementById("searchBar")
                console.log(search.value)
                clearTimeout(typingTimer)
                setLoading(true)
                setSearchValue(search.value)
                typingTimer = setTimeout(()=>{ 
                  setLoading(false)
                }, 2500)
              }
              function html(){ 
                if(searchValue){
                  if(loading){
                    return ( 
                      <div id="noData">
                        <img className="loading" src={props.loadingImg} />
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
        <div className="findfilms-page">
            <header className="header">
                <img className="hero-img" src={heroImg} />
                <div className="hero-title">
                <h1>Find films</h1>
                <h2 className="hero__watchlist" onClick={()=>props.setWatchlistPage(prev => !prev)}>My Watchlist</h2>
                </div>
                <div className="input-group">
                    <i className="fa fa-search"></i>
                    <input type="text" id="searchBar" placeholder="What are you looking for?" autoFocus />
                    <button className="btn" type="submit" id="searchBtn" onClick={handleChange}>Search</button>
                </div>
            </header>
            <main> 
                {html()}
            </main>
        </div>
    )
}