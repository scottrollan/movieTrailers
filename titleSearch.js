titleSearch = title => {
  let posters = [];
  $("#poster-area").empty();
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
        if (responseB.videos.results.length) {
          let objectAddB = {
            backdropPath: `https://image.tmdb.org/t/p/w500${responseB.backdrop_path}`,
            trailerKey: responseB.videos.results[0].key
          };
          $.extend(posters[i], objectAddB);
        } else {
          let objectAddB = {
            backdropPath: `https://image.tmdb.org/t/p/w500${responseB.backdrop_path}`,
            trailerKey: null
          };
          $.extend(posters[i], objectAddB);
        }
      });
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
          overview: responseT.Plot,
          website: responseT.Website,
          actors: responseT.Actors,
          goSee: null,
          genres: responseT.Genre.split(",") // array of strings e.g. ["Drama", "Comedy"...]
        };
        $.extend(posters[i], objectAdd);
        return posters;
      });
    }
    setTimeout(() => render(posters, false), 400);
  });
};
