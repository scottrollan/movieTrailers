const render = function (posters, fromDropdownMenu) {
    $('#display-poster').empty();

    for (let i = 0; i < posters.length; i++) {
        const containerDiv = $('<div>');
        containerDiv.addClass('container-movie');
        const movie = $('<div>');
        movie.addClass('movie');
        //front of the 3d movie element
        const movieInsideFront = $(`<div>`);
        movieInsideFront.addClass('movie-inside front');
        const image = $('<img>');     
        image.addClass('poster');
        image.attr('alt', posters[i].Title);
        image.attr('src', posters[i].Poster);
        image.attr('onerror', `this.onerror=null;this.src='${posters[i].posterBackup}';`);
        movieInsideFront.append(image);
        movie.append(movieInsideFront);
        //back of the 3d movie element           
        const movieInsideBack = $('<div style="background:#eeeeee;">');
        movieInsideBack.addClass('movie-inside back');
        const backImage = $('<img style="max-height:36%;">');
        const backImageSrc = posters[i].backdropPath;
        backImage.attr('src', backImageSrc);
        backImage.attr('onerror', "this.onerror=null;this.src='./assets/movieReel.png';");
        movieInsideBack.append(backImage);
        const movieDetails = $('<div>');
        movieDetails.addClass('movie-details');
        const movieSnap = $('<div>');
        movieSnap.addClass('movie-snap');
        const backHeading = $(`<h1>${posters[i].Title}<br><span>${posters[i].Year}  -  ${posters[i].runtime}  -  rated: ${posters[i].rated}</span></h1>`);
        movieSnap.append(backHeading);
        const movieTags = $('<div>');
        movieTags.addClass('movie-tags');

        if(posters[i].genresList) {
            posters[i].genresList.map(g => {
            const listItem = $(`<span style="color:white;">${g}</span>`);
            listItem.addClass('tags')
            movieTags.append(listItem);
            })
        }
        if(posters[i].actors) {
            const actors = $(`<p>${posters[i].actors}</p>`);
            actors.addClass('actors');
            movieSnap.append(actors);
        }

        movieSnap.append(movieTags);
        const movieSynopsis = $(`<p>${posters[i].overview}</p>`);
        movieSynopsis.addClass('movie-synopsis');
        movieSnap.append(movieSynopsis);
        movieDetails.append(movieSnap);
        movieInsideBack.append(movieDetails);
        movie.append(movieInsideBack);
        containerDiv.append(movie);

        if (fromDropdownMenu == true) {
            // posters[i].goSee = `https://www.fandango.com/search/?q=${posters[i].Title}`;
            image.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].poster_path}`);
            movieInsideFront.append(image);

            containerDiv.attr('imdb-id', posters[i].id);
            backImage.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].backdrop_path}`);
            // backHeading.html(`<h1>${posters[i].title}<br><span>Release Date: ${posters[i].release_date}  -  ${posters[i].runtime}  -  rated: ${posters[i].rated}</span></h1>`);
        }

        $('#display-poster').append(containerDiv);
    }
    $('.container-movie').click( function() {
        $(".movie", this).toggleClass("movieTurn");
        $(".front", this).toggleClass("frontTurn"); 
        console.log(this);     
    } );
    $('#movie-title').val('');
    showPoster();
}