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
        image.addClass('poster');
        image.attr('src', posters[i].Poster);
        image.attr('onerror', `this.onerror=null;this.src='${posters[i].posterBackup}';`);
        movieInsideFront.append(image);
        movie.append(movieInsideFront);
        //back of the 3d movie element           
        const movieInsideBack = $('<div style="background:#eeeeee;">');
        movieInsideBack.addClass('movie-inside back');
        const backImage = $('<img style="max-height:36%;">');
        backImage.addClass('poster')
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
        if (posters[i].goSee != null) {
            const goSeeHref = $(`<a href='${posters[i].goSee}' target='_blank'>`)
            goSeeHref.attr('id', posters[i].goSee) //using url text as unique id
            const goSeeBtn = $(`<img>`)
            goSeeBtn.attr('src', './assets/goSee.gif')
            // goSeeBtn.attr('style', 'width: 88px;height: 31px;border:0px;align-self: flex-end;')
            goSeeBtn.attr('alt', '""')
            goSeeBtn.addClass('fandango')
            goSeeHref.append(goSeeBtn)
            movieDetails.append(goSeeHref)
        }
        movieInsideBack.append(movieDetails);
        movie.append(movieInsideBack);
        containerDiv.append(movie);

        $('#display-poster').append(containerDiv);
    }
    // $('#goSee').click(function(event) {
    //     event.stopPropagation()
    //     window.open(event.value, '_blank')
    // }) 
    $('.container-movie').click( function() {
        $(".movie", this).toggleClass("movieTurn");
        $(".front", this).toggleClass("frontTurn"); 
    } );
    $('#movie-title').val('');
    showPoster();
}