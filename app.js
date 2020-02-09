const searchTitles = function(e) {
  e.preventDefault();
  const title = $("#searchInput")
    .val()
    .trim();
  getTitlePoster(title);
};

showTrailer = () => {
  $("#trailer").show();
  $("#back").show();
  $("#poster-area").hide();
  $("#searchArea").hide();
};

const showPoster = function() {
  $("#trailer").hide();
  $("#back").hide();
  $("iframe").attr("src", $("iframe").attr("src")); //stops video play
  $("#poster-area").show();
  $("#searchArea").show();

};

const dropdownVal = function() {
  const inputVal = $(this).attr("action");
  getPopular(inputVal);
};

$(".dropdown-item").on("click", dropdownVal);
$("#searchBtn").on("click", searchTitles);
$("#back").on("click", showPoster);
$(document).ready($("#trailer").hide());
$(document).ready($("#back").hide());
// $(document).ready($("#searchInput").val(""));
$(document).ready($("#searchInput").empty());


