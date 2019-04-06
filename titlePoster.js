const getTitlePoster = function (title) {
    const omdbBaseURL = "https://www.omdbapi.com/";
    $.ajax({
        url: `${omdbBaseURL}?s=${title}&apikey=e0c3e966`,
        method: 'GET'
    }).then(function (response) {
        const titleA = Object.values(response);
        const posters = titleA[0];
        render(posters, false);

        //===================================Begin Barry's Code
        // //iterating through posters[] adding object values from tmdb api
        for (let i = 0; i < posters.length; i++) {
            const wholeTitle = posters[i].Title;
            const apikey = '2404f28934c0e486a4e4a4accf9101c5';
            const queryURL3 = `https://api.themoviedb.org/3/movie/${posters[i].imdbID}?api_key=${apikey}&append_to_response=videos`;
            $.ajax({  //get the backdrop path for img on back of 3d object 
                url: queryURL3,
                method: 'GET'
            }).then(function (responseB) {
                let objectAddB = {  //creates objectAddB to store backdropPath key/value
                    backdropPath: responseB.backdrop_path,
                };

                $.extend(posters[i], objectAddB);  //extend objectAddB to the corresponding object in posters[]
                //return posters;
            });
            $.ajax({
                url: `${omdbBaseURL}?t=${wholeTitle}&plot=long&apikey=eb08547`,
                method: 'GET'
            }).then(function (responseT) {  //back to omdb to retrieve more key/value pairs to add to posters[]
                const genres = responseT.Genre; //separate the string Genre into distinct variables
                const genreSplit = genres.split(",");
                const genre1 = genreSplit[0];
                const genre2 = genreSplit[1];
                let objectAdd = {       //create objectAdd additional key/value fields destined for posters[]
                    rated: responseT.Rated,
                    runtime: responseT.Runtime,
                    genreOne: genre1,
                    genreTwo: genre2,
                    overview: responseT.Plot,
                    // tomatoRating: responseT.Ratings[1].Value,  //ICEBOX
                    website: responseT.Website
                };
                $.extend(posters[i], objectAdd);  //extend objectAdd to the corresponding object in posters[]
                render(posters);

            });
        }
        //=================================End Barry's New Code
    });
}

const getTMDBID = function (imdbID, source) {
    const apikey = '2404f28934c0e486a4e4a4accf9101c5';
    const queryURL = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${apikey}&append_to_response=videos`;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (res) {
        $('#inside-trailer').empty();
        $('#brief').empty();
        const vKey = res.videos.results[0].key;
        const title = res.title;
        const brief = res.overview;

        //new code begins ==vv=here
        const posterSrc = `https://image.tmdb.org/t/p/w500${res.poster_path}`;
        const backdropSrc = `https://image.tmdb.org/t/p/w500${res.backdrop_path}`;
        const year = `${res.release_date.substring(0, 4)}`;
        const runtime = `${res.runtime}`;
        // const genreA = `${res.genres[0].name}`;
        // const genreB = `${res.genres[1].name}`;
        // const genreC = `${res.genres[2].name}`;

        const imgDiv = $('<div>');

        const movie = $('<div>');
        imgDiv.addClass('selected-movie');
        movie.addClass('movie');
        const movieInsideFront = $('<div>');
        movieInsideFront.addClass('movie-inside front');
        const image = $('<img>');      //This is where the image lives now
        image.addClass('poster');
        image.attr('src', posterSrc);
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
        backImage.attr('src', backdropSrc)
        movieSnap.append(backImage);
        const backHeading = $(`<h1>${title}<br><span>${year}  -  ${runtime} min</span></h1>`);
        movieSnap.append(backHeading);
        //ul movieTags              COULDNT MAKE GENRES WORK!!!!
        // const movieTags = $('<ul>');
        // movieTags.addClass('movie-tags');
        //     // const listItems = $(`<li><a ref="#">${genreA}</a></li><li><a href="#">${genreB}</a></li><li><a href="#">${genreC}</a></li>`);
        //     movieTags.append(listItems);
        // movieSnap.append(movieTags);
        const movieSynopsis = $(`<p>${brief}</p>`);
        movieSynopsis.addClass('movie-synopsis');
        movieSnap.append(movieSynopsis);
        movieDetails.append(movieSnap);
        movieInsideBack.append(movieDetails);
        movie.append(movieInsideBack);
        imgDiv.append(movie);
        //==========================================End Barry's New Code//
        //const imgDiv =$('<img>');
        //imgDiv.attr('id', 'movie-poster'); THESE THREE LINES ARE THE OLD CODE
        //imgDiv.attr('src', source);

        const titleHolder = `<h5>${title}</h5>`;
        const briefHolder = `<p>${brief}</p>`;
        $('#inside-trailer').append(imgDiv);
        $('#brief').append(titleHolder).append(briefHolder);

        const src = `https://www.youtube.com/embed/${vKey}`;
        $('iframe').attr('src', src);
        showTrailer();
    });
}

const getPopular = function (search) {
    const popURL = `https://api.themoviedb.org/3/movie/${search}?api_key=2404f28934c0e486a4e4a4accf9101c5&language=en-US&page=1&region=US`;
    $.ajax({
        url: popURL,
        method: 'GET'
    }).then(function (response) {
        const posters = response.results;
        render(posters, true);
    });
}
