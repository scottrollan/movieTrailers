searchTitles = e => {
  e.preventDefault();
  const title = $("#searchInput")
    .val()
    .trim();
  $("#poster-area").empty();
  getTitlePoster(title);
};

showTrailer = () => {
  $("#trailer").show();
  $("#back").show();
  $("#poster-area").hide();
  $("#searchArea").hide();
};

showPoster = () => {
  $("#trailer").hide();
  $("#back").hide();
  $("iframe").attr("src", $("iframe").attr("src")); //stops video play
  $("#poster-area").show();
  $("#searchArea").show();
};

// selectFromDropdown = (action) => {
//   (() => getPopular(action));
// };

// $(".dropdown-item").on("click", dropdownVal);
$(".dropdown-item").on("click", function() {
    const category = $(this).attr("action")
    getPopular(category);
});
$("#searchBtn").on("click", searchTitles);
$("#back").on("click", showPoster);
$(document).ready($("#trailer").hide());
$(document).ready($("#back").hide());
$(document).ready($("#searchInput").empty());
