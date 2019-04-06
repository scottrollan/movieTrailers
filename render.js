const render = function (posters, dropdown) {
    $('#display-poster').empty();

    for (let i = 0; i < posters.length; i++) {

        const imgDiv = $('<div>');
        imgDiv.addClass('container-movie');
        const movie = $('<div>');
        movie.addClass('movie');
        const movieInsideFront = $('<div>');
        movieInsideFront.addClass('movie-inside front');
        const image = $('<img>');      //This is where the image lives now
        image.addClass('poster');
        image.attr('src', posters[i].Poster);
        movieInsideFront.append(image);
        movie.append(movieInsideFront);

        //back of the 3d movie element           
        const movieInsideBack = $('<div>');
        movieInsideBack.addClass('movie-inside back');
        const movieDetails = $('<div>');
        movieDetails.addClass('movie-details');
        const movieSnap = $('<div>');
        movieSnap.addClass('movie-snap');
        const backImage = $('<img>');
        const backImageSrc = `https://image.tmdb.org/t/p/w500/${posters[i].backdropPath}`;
        if (backImageSrc == '$0') {
            backImageSrc.attr('src', 'https://cdn.vox-cdn.com/thumbor/QdG0KHLW7hbXpkdU_FuBsl7dsOU=/0x0:2040x1360/1200x675/filters:focal(866x568:1192x894)/cdn.vox-cdn.com/uploads/chorus_image/image/62381212/jbareham_181121_0820_netflix_review_02.0.jpg');
        } else {
            backImage.attr('src', backImageSrc);
        }
        movieSnap.append(backImage);
        const backHeading = $(`<h1>${posters[i].Title}<br><span>${posters[i].Year}  -  ${posters[i].runtime}  -  rated: ${posters[i].rated}</span></h1>`);
        movieSnap.append(backHeading);
        //ul movieTags
        const movieTags = $('<ul>');
        movieTags.addClass('movie-tags');
        const listItems = $(`<li><a ref="#">${posters[i].genreOne}</a></li><li><a href="#">${posters[i].genreTwo}</a></li>`);
        movieTags.append(listItems);
        movieSnap.append(movieTags);
        const movieSynopsis = $(`<p>${posters[i].overview}</p>`);
        movieSynopsis.addClass('movie-synopsis');
        movieSnap.append(movieSynopsis);
        movieDetails.append(movieSnap);
        movieInsideBack.append(movieDetails);
        movie.append(movieInsideBack);
        imgDiv.append(movie);

        if (dropdown == true) {
            image.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].poster_path}`);
            movieInsideFront.append(image);

            imgDiv.attr('imdb-id', posters[i].id);
            backImage.attr('src', `https://image.tmdb.org/t/p/w500${posters[i].backdrop_path}`);
            backHeading.html(`<h1>${posters[i].title}<br><span>Release Date: ${posters[i].release_date}</span></h1>`);
            movieTags.empty();

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

    $('#movie-title').val('');
    showPoster();
}