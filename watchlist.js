//
const movieList = document.getElementById("movieList");
const loader = document.querySelector(".loader");
let arrayOfId = JSON.parse(localStorage.getItem("movie"));
console.log(arrayOfId);
arrayOfId.length > 0 && loader.classList.add("hidden");

const getWatchlistMovie = (array) => {
  movieList.innerHTML = "";
  array.forEach(async (movieID) => {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${movieID}&apikey=f230991a`
    );
    const watchlistedMovies = await res.json();
    movieList.innerHTML += `
        <div class = "movies">
            <div class = "movie-img">
                <img src = "${watchlistedMovies.Poster}"/>
            </div>
            <div class = "movie-about">
                <div>
                    <span class = "movie-name">${watchlistedMovies.Title}</span>
                    <i class="fa-solid fa-star" style="color: #f5e10a;"></i>
                    <span class = "movie-rating">${watchlistedMovies.imdbRating}</span>
                 </div>
                <div class = "movie-brief">
                    <span>${watchlistedMovies.Runtime}</span>
                    <span>${watchlistedMovies.Genre}</span>
                    <div class = "plus-watchlist">
                        <div id = "plus-icon" data-minus = "${watchlistedMovies.imdbID}">-</div>
                        <span>Remove from Watchlist</span>
                    </div>
                </div>
                <div class = "movie-description">
                  ${watchlistedMovies.Plot}
                </div>
            </div>
        </div>
        <hr>
        `;
  });
};
getWatchlistMovie(arrayOfId);

const WatchlistMovieEmptyOrNot = () => {
  if (!arrayOfId.length > 0) {
    movieList.innerHTML = `
            <div class="loader">
                <p>Your watchlist is looking a little empty ...</p>
                <div id="add-movies">
                  <div id="plus-icon2"><a href="/index.html">+</a></div>
                  <p>Let's add some movies!</p>
                </div>
            </div>
            `;
  }
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.minus) {
    console.log(e.target.dataset.minus);
    const index = arrayOfId.indexOf(e.target.dataset.minus);
    if (index > -1) {
      arrayOfId.splice(index, 1);
    }
    console.log(arrayOfId);
    getWatchlistMovie(arrayOfId);
    WatchlistMovieEmptyOrNot();
    localStorage.setItem("movie", JSON.stringify(arrayOfId));
  }
});
