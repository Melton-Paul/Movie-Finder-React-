
import heroImg from "./images/heroimg.jpg"

export default function App() {
  return (
    <div className="container">
      <header>
        <img className="hero-img" src={heroImg} />
        <h1>Find Your Film</h1>
        <h2>My Watchlist</h2>
      </header>
    </div>
  )
}


