const render = function (posters, fromDropdownMenu) {
    $('#display-poster').empty();
    console.log(posters)

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
        // const backImageSrc = posters[i].backdropPath;
        backImage.attr('src', posters[i].backdropPath);
        backImage.attr('onerror', "this.onerror=null;this.src='./assets/movieReel.png';");
        movieInsideBack.append(backImage);
        const movieDetails = $('<div>');
        movieDetails.addClass('movie-details');
        const movieSnap = $('<div>');
        movieSnap.addClass('movie-snap');
        const backHeading = $(`<h1>${posters[i].Title}<br><span>${posters[i].Year}${posters[i].runtime}${posters[i].rated}</span></h1>`);
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
        if (posters[i].goSee) {
            const goSeeBtn = `<button style='padding:8px 15px;z-index:9999;' href=${posters[i].goSee} target='_blank'>Find in Theaters</button>`
            movieInsideBack.append(goSeeBtn)
        }
        movieInsideBack.append(movieDetails);
        movie.append(movieInsideBack);
        containerDiv.append(movie);

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