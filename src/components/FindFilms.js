import heroImg from "../images/heroimg.jpg"
import React from "react"
import MovieCard from "./MovieCard"
import loadingImg from "../images/30+fps.gif"
import { Link } from "react-router-dom"



export default function FindFilms(props){
    const [searchValue, setSearchValue] = React.useState("")
    const [searchMemory, setSearchMemory] = React.useState("")
    const [movies, setMovies] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [movieHtml, setMovieHtml] = React.useState("")
    const [error, setError] = React.useState(false)
    const [page, setPage] = React.useState(1)
    let typingTimer


    React.useEffect(()=>{

        if(!searchValue){
          return 
        }
          fetch(`https://www.omdbapi.com/?apikey=9980ac75&s=${searchValue}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if(data.Response === "False"){
                  throw Error("No Movie Found")
                } else {
                  setError(false)
                }
              let movieList = []
              data.Search.forEach(movie=>{
                fetch(`https://www.omdbapi.com/?apikey=9980ac75&t=${movie.Title}&plot=short`)
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
        }, [searchMemory, searchValue, page])

        window.scrollTo(0, 0)
        
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
                    <img className="loading" src={loadingImg} alt=""/>
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
                <img className="hero-img" src={heroImg} alt="" />
                <div className="hero-title">
                <h1>Find your film</h1>
                <Link className="hero__watchlist link" to="/watchlist">My Watchlist</Link>
                </div>
                <div className="input-group">
                    <i className="fa fa-search"></i>
                    <input type="text" id="searchBar" placeholder="What are you looking for?" value={searchValue} onChange={handleChange} autoFocus  />
                    <button className="btn" type="submit" id="searchBtn">Search</button>
                </div>
            </header>
            <main> 
                {html()}
                { movieHtml &&
                <div className="btn-container">
                  <button onClick={()=> setPage(prev => prev - 1)}>&lt;</button>
                  <span>Page {page}</span>
                  <button onClick={()=> setPage(prev => prev + 1)}>&gt;</button>
                </div>}
            </main>
        </div>
    )
}