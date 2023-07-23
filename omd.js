const movieSelector = document.getElementById("movie-selector");
const resultList = document.getElementById("result-list");

function findMovie() {
  let searchTerm = movieSelector.value;
  if (searchTerm.length > 0) {
    loadMovies(searchTerm);
  }
}

async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=643f294a`;
  //trying out that the fecth is working
  /*const URL = `https://www.omdbapi.com/?s=Batman&apikey=643f294a`*/
  const res = await fetch(`${URL}`);
  const data = await res.json();
  movieList(data.Search);
  console.log(data.Search);
}

function movieList(movies) {
  resultList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
    /*console.log(movies[i].imdbID);*/
    movieListItem.classList.add("search-list-item");
    movieListItem.classList.add("col");
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "img-not-found.png";

    movieListItem.innerHTML = `
        
          <div class = "search-item-thumbnail text-center">
            <img src = "${moviePoster}">
          </div>
          <div class = "search-item-info text-center">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
          </div>
      
        `;
    resultList.appendChild(movieListItem);
  }
  loadMovieResultPage();
}

function loadMovieResultPage() {
  const searchListItem = resultList.querySelectorAll('.search-list-item');
  searchListItem.forEach(item => {
    item.addEventListener('click', async () => {
      console.log('click');
      localStorage.setItem('movieID', item.dataset.id);
      let dir = window.location.origin + "/IMDB-copy/result/resultPage.html"; // Custom URL for result page
      window.location.href = "https://dokesz.github.io/IMDB-copy/result/resultPage.html"; //Redirect to a new page
    })
  })
}