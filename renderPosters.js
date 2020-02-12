const render = function(posters, fromDropdownMenu) {

$("#poster-area").empty()

  for (let i = 0; i < posters.length; i++) {
    const containerDiv = $("<div>")
    containerDiv.addClass("container-movie")
    containerDiv.attr('id', posters[i].trailerKey)
    const movie = $("<div>");
    movie.addClass("movie");
    //front of the 3d movie element
    const movieInsideFront = $(`<div>`);
    movieInsideFront.addClass("movie-inside front");
    const image = $("<img>");
    image.addClass("poster");
    image.attr("alt", `${posters[i].Title}`);
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
    backImage.attr("id", "posterBack");
    if (
      posters[i].backdropPath &&
      posters[i].backdropPath != "https://image.tmdb.org/t/p/w500null"
    ) {
      backImage.attr("src", posters[i].backdropPath);
    } else {
      backImage.attr("src", "./assets/movieReel.png");
    }

    movieInsideBack.append(backImage);
    const movieDetails = $("<div>");
    movieDetails.addClass("movie-details");
    const movieSnap = $("<div>");
    movieSnap.addClass("movie-snap");
    if (posters[i].Title.length > 30) {
      const backHeading = $(`<p>${posters[i].Title}</p>`);
      backHeading.addClass("smallerTitle");
      movieSnap.append(backHeading);
    } else if (posters[i].Title.length > 0) {
      const backHeading = $(`<h4>${posters[i].Title}</h4>`);
      movieSnap.append(backHeading);
    }

    const year = $(`<p id="metaData">${posters[i].Year}</p>`);
    movieSnap.append(year);

    const movieSynopsis = $(`<p>${posters[i].overview}</p>`);
    movieSynopsis.addClass("movie-synopsis");
    movieSnap.append(movieSynopsis);
    movieDetails.append(movieSnap);

    const buttonRow = $("<div>")
    buttonRow.addClass("buttonRow")

    const youtubeHref = $(`<a href='#${posters[i].trailerKey}>`)
    const youtubeTrailer = $(`<img>`)
    youtubeTrailer.attr("src", "./assets/youtube.png")
    youtubeTrailer.addClass("youtube")
    youtubeTrailer.attr("title", posters[i].Title)
    youtubeTrailer.attr("overview", posters[i].overview)
    youtubeTrailer.attr("vKey", posters[i].trailerKey)
    youtubeTrailer.attr(
      "metaData",
      posters[i].Year + posters[i].runtime + posters[i].rated
    );
    youtubeTrailer.attr("genres", posters[i].genres)
    youtubeTrailer.attr("actors", posters[i].actors)
    youtubeTrailer.attr("ratings", posters[i].ratings)
    youtubeHref.append(youtubeTrailer)

    const moreInfoHref = $("<a>");
    const moreInfo = $("<button>");
    moreInfo.append("More Info");
    moreInfo.addClass("btn btn secondary modalBtn");
    moreInfo.attr("id", "modalBtn");
    moreInfo.attr("type", "button");
    moreInfo.attr("title", posters[i].Title);
    moreInfo.attr("overview", posters[i].overview);
    moreInfo.attr("genres", posters[i].genres);
    moreInfo.attr("actors", posters[i].actors);
    moreInfo.attr("ratings", posters[i].ratings);
    moreInfo.attr(
      "metaData",
      posters[i].Year + posters[i].runtime + posters[i].rated
    );
    moreInfoHref.append(moreInfo);

    const goSeeHref = $(`<a href='${posters[i].goSee}' target='_blank'>`);
    const goSeeBtn = $(`<img>`);
    goSeeBtn.attr("src", "./assets/goSee.gif");
    goSeeBtn.attr("alt", '""');
    goSeeBtn.addClass("fandango");
    goSeeHref.append(goSeeBtn);

    buttonRow.append(goSeeHref);
    buttonRow.append(youtubeHref);
    buttonRow.append(moreInfoHref);
    if (posters[i].goSee === null) {
      goSeeHref.addClass("displayNone");
    }
    if (posters[i].trailerKey === null) {
      youtubeTrailer.addClass("displayNone");
    } else {
      moreInfoHref.addClass("displayNone"); //either youtube trailer or more Info button will display
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
    seeTrailer(
      $(this).attr("title"),
      $(this).attr("overview"),
      $(this).attr("vKey"),
      $(this).attr("metaData"),
      $(this).attr("genres"),
      $(this).attr("actors"),
      $(this).attr("ratings")
    );
  });
  $(".modalBtn").on("click", function() {
    seeModal(
      $(this).attr("title"),
      $(this).attr("overview"),
      $(this).attr("metaData"),
      $(this).attr("genres"),
      $(this).attr("actors"),
      $(this).attr("ratings")
    );
  });

  $("#movie-title").val("");
  showPoster();
};
