
import heroImg from "./images/heroimg.jpg"

export default function App() {
  return (
    <div className="container">
      <header className="header">
          <img className="hero-img" src={heroImg} />
          <div className="hero-title">
            <h1>Find Your Film</h1>
            <h2 className="hero__watchlist">My Watchlist</h2>
          </div>
      </header>
      <main>
        
      </main>
    </div>
  )
}


