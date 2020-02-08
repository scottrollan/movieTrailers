const render = function(posters, fromDropdownMenu) {
  $("#poster-area").empty();

  for (let i = 0; i < posters.length; i++) {
    const containerDiv = $("<div>");
    containerDiv.addClass("container-movie");
    const movie = $("<div>");
    movie.addClass("movie");
    //front of the 3d movie element
    const movieInsideFront = $(`<div>`);
    movieInsideFront.addClass("movie-inside front");
    const image = $("<img>");
    image.addClass("poster");
    image.attr("alt", posters[i].Title);
    image.addClass("poster");
    image.attr("src", posters[i].Poster);
    image.attr(
      "onerror",
      `this.onerror=null;this.src='${posters[i].posterBackup}';`
    );
    movieInsideFront.append(image);
    movie.append(movieInsideFront);

    //back of the 3d movie element
    const movieInsideBack = $('<div style="background:#eeeeee;">');
    movieInsideBack.addClass("movie-inside back");
    const backImage = $('<img style="max-height:36%;">');
    backImage.addClass("poster");
    backImage.attr("id", "posterBack")
    if(posters[i].backdropPath && posters[i].backdropPath != 'https://image.tmdb.org/t/p/w500null') {
      backImage.attr("src", posters[i].backdropPath);
    }else{
      backImage.attr("src", "./assets/movieReel.png");
    }
    

    movieInsideBack.append(backImage);
    const movieDetails = $("<div>");
    movieDetails.addClass("movie-details");
    const movieSnap = $("<div>");
    movieSnap.addClass("movie-snap");
    const backHeading = $(
      `<h1>${posters[i].Title}<p id="subHeading">${posters[i].Year}${posters[i].runtime}${posters[i].rated}</p></h1>`
    );
    movieSnap.append(backHeading);

    const movieTags = $("<div>");
    movieTags.addClass("movie-tags");

    if (posters[i].genres) {
      posters[i].genres.map(g => {
        const listItem = $(`<span style="color:white;">${g}</span>`);
        listItem.addClass("tags");
        movieTags.append(listItem);
      });
    }
    if (posters[i].actors) {
      const actors = $(`<p>${posters[i].actors}</p>`);
      actors.addClass("actors");
      movieSnap.append(actors);
    }

    movieSnap.append(movieTags);
    const movieSynopsis = $(`<p>${posters[i].overview}</p>`);
    movieSynopsis.addClass("movie-synopsis");
    movieSnap.append(movieSynopsis);
    movieDetails.append(movieSnap);

    const buttonRow = $("<div>");
    buttonRow.addClass("buttonRow");

    let elem = posters[i].imdbID;
    const youtubeTrailer = $(`<img>`);
    youtubeTrailer.attr("id", posters[i].imdbID);
    youtubeTrailer.attr("title", posters[i].Title);
    youtubeTrailer.attr("overview", posters[i].overview);
    youtubeTrailer.attr("vKey", posters[i].trailerKey);
    youtubeTrailer.attr("src", "./assets/youtube.png");
    youtubeTrailer.addClass("youtube");

    const goSeeHref = $(`<a href='${posters[i].goSee}' target='_blank'>`);
    const goSeeBtn = $(`<img>`);
    goSeeBtn.attr("src", "./assets/goSee.gif");
    goSeeBtn.attr("alt", '""');
    goSeeBtn.addClass("fandango");
    goSeeHref.append(goSeeBtn);

    buttonRow.append(goSeeHref);
    buttonRow.append(youtubeTrailer);
    if (posters[i].goSee === null) {
      goSeeHref.addClass("displayNone");
    }
    if (posters[i].trailerKey === null) {
      youtubeTrailer.addClass("displayNone");
    }   

    movieDetails.append(buttonRow);
    movieInsideBack.append(movieDetails);
    movie.append(movieInsideBack);
    containerDiv.append(movie);


    $("#poster-area").append(containerDiv);
  }
  $(".container-movie").click(function() {
    $(".movie", this).toggleClass("movieTurn");
    $(".front", this).toggleClass("frontTurn");
  });

  $(".youtube").on("click", function() {
    seeTrailer($(this).attr("title"),$(this).attr("overview"),$(this).attr("vKey"));
  });

  $("#movie-title").val("");
  showPoster();
};
