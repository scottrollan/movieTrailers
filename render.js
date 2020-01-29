const render = function (posters, dropdown) {
    $('#display-poster').empty();

    for (let i = 0; i < posters.length; i++) {
        //front of the 3d movie element
        const imgDiv = $('<div>');
        imgDiv.addClass('container-movie');
        const movie = $('<div>');
        movie.addClass('movie');
        const movieInsideFront = $(`<div>`);
        movieInsideFront.addClass('movie-inside front');
        const image = $('<img>');     
        image.addClass('poster');
        image.attr('alt', posters[i].Title);
        image.attr('src', posters[i].Poster);
        movieInsideFront.append(image);
        movie.append(movieInsideFront);

        //back of the 3d movie element           
        const movieInsideBack = $('<div style="background:#eeeeee;">');
        movieInsideBack.addClass('movie-inside back');
        const backImage = $('<img style="max-height:36%;">');
        const backImageSrc = `https://image.tmdb.org/t/p/w500/${posters[i].backdropPath}`;
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

        if(posters[i].genres) {
            posters[i].genres.map(g => {
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
        imgDiv.append(movie);
        // if (inTheaters) {
            // const theaterLink = `https://www.fandango.com/search/?q=${posters[i].Title}`;
            // const goSee = $(`<button href='${theaterLink}' target='_blank'>See It In Theaters</button>`);
            // goSee.addClass('goSeeBtn');
            // movieInsideBack.append(goSee);
        // }

        if (dropdown == true) {
            image.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].poster_path}`);
            movieInsideFront.append(image);

            imgDiv.attr('imdb-id', posters[i].id);
            backImage.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].backdrop_path}`);
            backHeading.html(`<h1>${posters[i].title}<br><span>Release Date: ${posters[i].release_date}</span></h1>`);
            // movieTags.empty();

        } else {
            if (posters[i].Poster !== 'N/A' && posters[i].Type === 'movie') {
                imgDiv.attr('imdb-id', posters[i].imdbID);
            }
            else {
                imgDiv.hide();
            }
        }

        $('#display-poster').append(imgDiv);
    }
    $('.container-movie').click( function() {
        $(".movie", this).toggleClass("movieTurn");
        $(".front", this).toggleClass("frontTurn");            
    } );
    $('#movie-title').val('');
    showPoster();
}