import heroImg from "../images/heroimg.jpg"

export default function FindFilms(props){
    return (
        <div className="findfilms-page">
            <header className="header">
                <img className="hero-img" src={heroImg} />
                <div className="hero-title">
                <h1>Find films</h1>
                <h2 className="hero__watchlist" onClick={()=>props.setWatchlistPage(prev => !prev)}>My Watchlist</h2>
                </div>
                <div className="input-group">
                    <i class="fa fa-search"></i>
                    <input type="text" id="searchBar" placeholder="What are you looking for?" onChange={props.handleChange} value={props.searchValue} autoFocus />
                    <button className="btn" type="submit" id="searchBtn">Search</button>
                </div>
            </header>
            <main> 
                {props.html()}
            </main>
        </div>
    )
}