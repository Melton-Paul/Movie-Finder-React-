
export default function MovieCard(props){
    const {Poster, Title, imdbRating, Runtime, Genre, Plot} = props.props
    console.log(Title)
    return (
    <div class="movie-container container">
        <img class="movie-img" src={Poster} alt="A poster of the movie" />
        <div class="movie-content">
            <div class="movie-header">
                <h2 class="movie-title clear__bottom">{Title}</h2>
                <i class="fa fa-star clear__bottom"></i>
                <p class="movie-rating clear__bottom">{imdbRating}</p>
            </div>
            <div class="movie-tags">
                <p class="movie-tag movie-time clear__bottom">{Runtime}</p>
                <p class="movie-tag movie-category clear__bottom">{Genre}</p>
                <div class=" movie-tag watchlist-add" id="${imdbID}" >
                <i class="fa fa-plus"></i>
                <p class="clear__bottom" >Add to Watchlist</p>
                </div>
            </div>
            <div class="movie-desc">
                <p>{Plot}</p>
            </div>
        </div>
    </div>)
}