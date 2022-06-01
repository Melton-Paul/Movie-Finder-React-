import heroImg from "../images/heroimg.jpg"
import React from "react"
import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"
import usePageLogic from "../hooks/usePageLogic"

export default function Watchlist(){
    const [watchlistHtml, setWatchlistHtml] = React.useState([])
    const {
        watchlistStorage, 
        removeStorage} =  usePageLogic()


    React.useEffect(()=>{
        JSON.parse(window.localStorage.getItem("watchlist")).forEach(id => {
            fetch(`https://www.omdbapi.com/?apikey=9980ac75&i=${id}&`)
                .then(res => res.json())
                .then(data => {
                    setWatchlistHtml(prev => [...prev, data])
                })
        })
    }, [])

    const html = watchlistHtml.map(movie => {
        return <MovieCard props={{...movie}} removeStorage={removeStorage} watchlistStorage={watchlistStorage} />
    })



    return (
    <div className="watchlist-page">
        <header className="header">
            <img className="hero-img" src={heroImg} />
            <div className="hero-title">
            <h1>Your Watchlist</h1>
            <Link className="hero__watchlist link" to="/findfilms">Go back to finding films</Link>
            </div>
        </header>
        <main>
            {watchlistHtml.length > 0  ? 
                html : 
                <Link className="link" to="/findfilms">
                    <div id="noData">
                        <i className="fa fa-film fa-6x"></i>
                        <p>Start Exploring</p>
                        <p>No films in your list</p>
                    </div>
                </Link> }
        </main>
    </div>)
}