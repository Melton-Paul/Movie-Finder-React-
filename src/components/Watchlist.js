import heroImg from "../images/heroimg.jpg"
import React from "react"
import MovieCard from "./MovieCard"

export default function Watchlist(props){
    console.log(props.watchlistHtml)
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
        return <MovieCard props={{...movie}} removeStorage={props.removeStorage} watchlistRender={true} />
    })





    return (
    <div className="watchlis-page">
        <header className="header">
            <img className="hero-img" src={heroImg} />
            <div className="hero-title">
            <h1>Your Watchlist</h1>
            <h2 className="hero__watchlist" onClick={()=>props.setWatchlistPage(prev => !prev )}>Go back to finding films</h2>
            </div>
        </header>
        <main>
            {html}
        </main>
    </div>)
}