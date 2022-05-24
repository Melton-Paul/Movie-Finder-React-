import heroImg from "../images/heroimg.jpg"
import React from "react"
import MovieCard from "./MovieCard"

export default function Watchlist(props){
    const [watchlistHtml, setWatchlistHtml] = React.useState([])


    React.useEffect(()=>{
        JSON.parse(window.localStorage.getItem("watchlist")).forEach(id => {
            fetch(`https://www.omdbapi.com/?apikey=9980ac75&i=${id}&`)
                .then(res => res.json())
                .then(data => {
                    setWatchlistHtml(prev => [...prev, data])
                })
        })
    }, [props.watchlistPage])

    const html = watchlistHtml.map(movie => {
        return <MovieCard props={{...movie}} removeStorage={props.removeStorage} watchlistStorage={props.watchlistStorage} />
    })



    return (
    <div className="watchlist-page">
        <header className="header">
            <img className="hero-img" src={heroImg} />
            <div className="hero-title">
            <h1>Your Watchlist</h1>
            <h2 className="hero__watchlist" onClick={()=>props.setWatchlistPage(prev => !prev )}>Go back to finding films</h2>
            </div>
        </header>
        <main>
            {watchlistHtml.length > 0  ? 
                html : 
                <div id="noData" onClick={()=>props.setWatchlistPage(prev => !prev )}>
                    <i className="fa fa-film fa-6x"></i>
                    <p>Start Exploring</p>
                    <p>No films in your list yet!</p>
                </div> }
        </main>
    </div>)
}