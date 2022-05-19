
export default function MovieCard(props){
    console.log(props)
    return (
    <div class="movie-container container">
        <img class="movie-img" src="" alt="A poster of the movie" />
        <div class="movie-content">
            <div class="movie-header">
                <h2 class="movie-title clear__bottom">Title</h2>
                <i class="fa fa-star clear__bottom"></i>
                <p class="movie-rating clear__bottom">3</p>
            </div>
            <div class="movie-tags">
                <p class="movie-tag movie-time clear__bottom">3 hours</p>
                <p class="movie-tag movie-category clear__bottom">Test Tag</p>
                <div class=" movie-tag watchlist-add" id="${imdbID}" >
                <i class="fa fa-plus"></i>
                <p class="clear__bottom" >Add to Watchlist</p>
                </div>
            </div>
            <div class="movie-desc">
                <p>lorem4000000000000000000000000 00000000000000000000000000000 000000000000 000000</p>
            </div>
        </div>
    </div>)
}