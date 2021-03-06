selectFromDropdown = clickedOption => {
  let posters = [];
  $("#poster-area").empty();
  const currentlyInTheaters = clickedOption;
  const popURL = `https://api.themoviedb.org/3/movie/${clickedOption}?api_key=2404f28934c0e486a4e4a4accf9101c5&language=en-US&page=1&region=US`;
  $.ajax({
    url: popURL,
    method: "GET"
  }).then(function(response) {
    for (i = 0; i < response.results.length; i++) {
      const unformattedDate = response.results[i].release_date.split('-')
      const formattedDate = `${unformattedDate[1]}/${unformattedDate[2]}/${unformattedDate[0]}`
      popObject = {
        Title: response.results[i].title,
        tmdbID: response.results[i].id,
        Poster: `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`,
        posterBackup: null,
        backdropPath: `https://image.tmdb.org/t/p/w500${response.results[i].backdrop_path}`,
        Year: `release date: ${formattedDate}`,
        runtime: "",
        rated: "",
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
    for (let i = 0; i < posters.length; i++) {
      const lookup = posters[i].tmdbID;
      let imdbID = "";
      const apikey = "2404f28934c0e486a4e4a4accf9101c5";
      const queryURL3 = `https://api.themoviedb.org/3/movie/${lookup}?api_key=${apikey}&append_to_response=videos`;
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(responseB) {
        imdbID = responseB.imdb_id;
        if (responseB.videos.results.length) {
          let objectAddB = {
            imdbID: responseB.imdb_id,
            trailerKey: responseB.videos.results[0].key
          };
          $.extend(posters[i], objectAddB);
        } else {
          let objectAddB = {
            imdbID: responseB.imdb_id,
            trailerKey: null
          };
          $.extend(posters[i], objectAddB);
        }
        // });
        $.ajax({
          url: `https://www.omdbapi.com/?i=${imdbID}&plot=long&apikey=eb08547`,
          method: "GET"
        }).then(function(responseT) {
          const ratingArray = [];
          responseT.Ratings.map(r => {
            const ratingString = `${r.Source} score: ${r.Value}`;
            ratingArray.push(ratingString);
          });
          let objectAdd = {
            rated: ` - rated: ${responseT.Rated}`,
            runtime: ` - runtime: ${responseT.Runtime}`,
            ratings: ratingArray,
            website: responseT.Website,
            actors: responseT.Actors,
            genres: responseT.Genre.split(",") // array of strings e.g. ["Drama", "Comedy"...]
          };
          $.extend(posters[i], objectAdd);
          return posters;
        });
      });
    }
  });
  setTimeout(() => render(posters, true), 400);
};
