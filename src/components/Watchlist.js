import heroImg from "../images/heroimg.jpg"

export default function Watchlist(props){
    return (
    <header className="header">
        <img className="hero-img" src={heroImg} />
        <div className="hero-title">
        <h1>Your Watchlist</h1>
        <h2 className="hero__watchlist" onClick={()=>props.setWatchlistPage(prev => !prev )}>Go back to finding films</h2>
        </div>
    </header>)
}