const searchTitles = function(e) {
  e.preventDefault();
  const title = $("#searchInput")
    .val()
    .trim();
  getTitlePoster(title);
  $("#searchInput").empty();
};

const showTrailer = function() {
  $("#trailer").show();
  $("#back").show();
  $("#poster-area").hide();
};

const showPoster = function() {
  $("#trailer").hide();
  $("#back").hide();
  $("iframe").attr("src", $("iframe").attr("src")); //stops video play
  $("#poster-area").show();
};

const dropdownVal = function() {
  const inputVal = $(this).attr("action");
  getPopular(inputVal);
};

$(".dropdown-item").on("click", dropdownVal);
$("#searchBtn").on("click", searchTitles);
$("#back").on("click", showPoster);
// $('.youtube').on('click', '.container-movie', getIMDB);
$(document).ready($("#trailer").hide());
$(document).ready($("#back").hide());
$(document).ready($("#searchTitle").val(""));


