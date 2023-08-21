const movieList = document.getElementById("movieList");
const inputEl = document.getElementById("inputEl");
const searchBtn = document.getElementById("search-btn");
const loader = document.querySelector(".loader");

const getMovie = async () => {
  // Fetching MovieData after taking user Input
  const res = await fetch(
    `https://www.omdbapi.com/?s=${inputEl.value}&plot=full&apikey=f230991a`
  );
  const data = await res.json();

  // If there is no movie, then unable to find in Loader
  console.log(data.Search);
  if (data.Search === undefined) {
    loader.style.fontSize = "1.8rem";
    loader.textContent = `Unable to find what you're looking for. Please try another search.`;
  } else {
    inputEl.value = "";
    movieList.innerHTML = "";

    // Iterating over the array data.Search
    data.Search.forEach((movie) => {
      //
      //Fetching Movies after updating the URL()
      const getMovieDetails = async () => {
        const res = await fetch(
          `https://www.omdbapi.com/?t=${movie.Title}&apikey=f230991a`
        );
        const dataOfMovie = await res.json();
        loader.textContent = "";

        movieList.innerHTML += `
        <div class = "movies">
            <div class = "movie-img">
                <img src = "${dataOfMovie.Poster}"/>
            </div>
            <div class = "movie-about">
                <div>
                    <span class = "movie-name">${dataOfMovie.Title}</span>
                    <i class="fa-solid fa-star" style="color: #f5e10a;"></i>
                    <span class = "movie-rating">${dataOfMovie.imdbRating}</span>
                 </div>
                <div class = "movie-brief">
                    <span>${dataOfMovie.Runtime}</span>
                    <span>${dataOfMovie.Genre}</span>
                    <div class = "plus-watchlist">
                        <div id = "plus-icon" data-plus = "${dataOfMovie.imdbID}">+</div>
                        <span>Watchlist</span>
                    </div>
                </div>
                <div class = "movie-description">
                  ${dataOfMovie.Plot}
                </div>
            </div>
        </div>
        <hr>
        `;
      };
      getMovieDetails();
    });
  }
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.plus) {
    e.target.parentElement.innerHTML = `
                    <div class = "plus-watchlist">
                        <div><i class="fa-solid fa-check" style="color: #15f424;"></i></div>
                        <span>Added to Watchlist!</span>
                    </div>
                    `;
    const arrayOfId = JSON.parse(localStorage.getItem("movie")) ?? [];
    console.log(arrayOfId);
    if (
      e.target.dataset.plus !== "undefined" &&
      !arrayOfId.includes(e.target.dataset.plus)
    ) {
      arrayOfId.push(e.target.dataset.plus);
    }
    console.log(arrayOfId);
    localStorage.setItem("movie", JSON.stringify(arrayOfId));
  }
});

searchBtn.addEventListener("click", getMovie);

inputEl.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});
