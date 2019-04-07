const getIMDB = function () {
    imdbValue = $(this).attr('imdb-id');
    source = $(this).attr('src');
    getTMDBID(imdbValue, source);
}

const searchTitles = function (e) {
    e.preventDefault();
    const title = $('#searchTitle').val().trim();
    getTitlePoster(title);
    $('#searchTitle').empty();
}

const showTrailer = function () {
    $('#trailer').show();
    $('#display-poster').hide();
}

const showPoster = function () {
    $('#trailer').hide();
    $('#display-poster').show();
}

const dropdownVal = function () {
    const inputVal = $(this).attr('action');
    getPopular(inputVal);
}

$('.dropdown-item').on('click', dropdownVal);
$('#searchBtn').on('click', searchTitles);
$('#display-poster').on('click', '.container-movie', getIMDB);