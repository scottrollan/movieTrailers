const getTitlePoster = function(title) {
  $.ajax({
    url: `https://www.omdbapi.com/?s=${title}&type=movie&apikey=e0c3e966`,
    method: "GET"
  }).then(function(response) {
    const posterList = response.Search;
    const posters = [];
    for (i = 0; i < posterList.length; i++) {
      posters.push(posterList[i]);
    }
    for (let i = 0; i < posters.length; i++) {
      const imdbID = posters[i].imdbID;
      const apikey = "2404f28934c0e486a4e4a4accf9101c5";
      const queryURL3 = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${apikey}&append_to_response=videos`;
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(responseB) {
        let objectAddB = {
          backdropPath: `https://image.tmdb.org/t/p/w500${responseB.backdrop_path}`,
          trailerKey: responseB.videos.results[0].key
        };
        $.extend(posters[i], objectAddB); //extend objectAddB to the corresponding object in posters[]
        //return posters;
      });
      $.ajax({
        url: `https://www.omdbapi.com/?i=${imdbID}&plot=long&apikey=eb08547`,
        method: "GET"
      }).then(function(responseT) {
        let objectAdd = {
          rated: ` - rated ${responseT.Rated}`,
          runtime: ` - runtime: ${responseT.Runtime}`,
          overview: responseT.Plot,
          ratings: responseT.Ratings, //array of objects e.g. [{Source: "IMDB", Value: "66%"}, ...]
          website: responseT.Website,
          actors: responseT.Actors,
          goSee: null
        };
        let genreKey = {
          genres: responseT.Genre.split(",") // array of strings e.g. ["Drama", "Comedy"...]
        };
        $.extend(objectAdd, genreKey);
        $.extend(posters[i], objectAdd); 
        render(posters)
      });
    }
  });
};

const getTMDBID = function(imdbID) {

    const src = `https://www.youtube.com/embed/${vKey}`;
    $("iframe").attr("src", src);

    const goSee = `<button href='https://www.fandango.com/search/?q=${title}' target="_blank">Find This Movie</button>`;
    showTrailer();

};

const getPopular = function(clickedOption) {
  let posters = [];
  const currentlyInTheaters = clickedOption;
  const popURL = `https://api.themoviedb.org/3/movie/${clickedOption}?api_key=2404f28934c0e486a4e4a4accf9101c5&language=en-US&page=1&region=US`;
  $.ajax({
    url: popURL,
    method: "GET"
  }).then(function(response) {
    for (i = 0; i < response.results.length; i++) {
      popObject = {
        Title: response.results[i].title,
        Poster: `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`,
        posterBackup: null,
        backdropPath: `https://image.tmdb.org/t/p/w500${response.results[i].backdrop_path}`,
        Year: `release date: ${response.results[i].release_date}`,
        runtime: "",
        rated: "",
        genres: [],
        actors: "",
        overview: response.results[i].overview
      };
      if (currentlyInTheaters == "upcoming") {
        goSeeOption = {
          goSee: null
        };
        $.extend(popObject, goSeeOption);
      } else {
        const encodedTitle = encodeURIComponent(
          response.results[i].title.trim()
        );
        goSeeOption = {
          goSee: `https://www.fandango.com/search/?q=${encodedTitle}`
        };
        $.extend(popObject, goSeeOption);
      }
      posters.push(popObject);
    }
    render(posters, true);
    // setTimeout(() => render(posters, true), 400);
  });
};
