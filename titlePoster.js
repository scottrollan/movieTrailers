let posters = []

const getTitlePoster = function(title) {
  $("#searchInput").empty();

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
        const ratingArray = []
        responseT.Ratings.map(r => {
          const ratingString = `${r.Source} score: ${r.Value}`
          ratingArray.push(ratingString)
        })
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
    setTimeout(() => render(posters, false), 400)
  });
};

////// Get from Dropdown //////
const getPopular = function(clickedOption) {
  const currentlyInTheaters = clickedOption;
  const popURL = `https://api.themoviedb.org/3/movie/${clickedOption}?api_key=2404f28934c0e486a4e4a4accf9101c5&language=en-US&page=1&region=US`;
  $.ajax({
    url: popURL,
    method: "GET"
  }).then(function(response) {
    for (i = 0; i < response.results.length; i++) {
      popObject = {
        Title: response.results[i].title,
        tmdbID: response.results[i].id,
        Poster: `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`,
        posterBackup: null,
        backdropPath: `https://image.tmdb.org/t/p/w500${response.results[i].backdrop_path}`,
        Year: `release date: ${response.results[i].release_date}`,
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
          const ratingArray = []
          responseT.Ratings.map(r => {
            const ratingString = `${r.Source} score: ${r.Value}`
            ratingArray.push(ratingString)
          })
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

/////// See youtube Trailer //////
seeTrailer = (title, overview, vKey, metaData, genres, actors, ratings) => {
  $("#inside-trailer").empty();
  $("#brief").empty();
  $("#movieInfo").empty();

  const titleHolder = $(`<h5>${title}</h5>`);
  const metaDataHolder = $(`<p id="metaData">${metaData}</p>`);
  const overviewHolder = $(`<p>${overview}</p>`);
  
  const ratingArray = ratings.split(',')
  const ratingsHolder = $('<ul>')
  ratingsHolder.addClass('ratingList')
  ratingArray.map(r => {
    const rli = `<li>${r}</li>`
    ratingsHolder.append(rli)
  })

  const actorArray = actors.split(',')
  const actorsHolder = $('<ul>');
  actorsHolder.addClass('actorList')
  actorArray.map(a => {
    const actorName = a.split(' ').join('+')
    const ali = `<a href='https://www.imdb.com/find?navbar-search-category-select=on&q=${actorName}&ref_=nv_sr_sm' target='_blank'><li>${a}</li></a>`
    actorsHolder.append(ali)
  })
  const genresHolder = $(`<div>${genres.toUpperCase().split(',').join('   -   ')}</div>`);
  genresHolder.addClass("movie-tags");

  $("#brief")
    .append(titleHolder)
    .append(metaDataHolder)
    .append(overviewHolder)
    .append(ratingsHolder)

  $("#movieInfo")
    .append(actorsHolder)
    .append(genresHolder);

  const src = `https://www.youtube.com/embed/${vKey}`;
  $("iframe").attr("src", src);
  showTrailer();
};