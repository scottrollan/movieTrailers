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

$(".dropdown-item").on("click", function() {
    const category = $(this).attr("action")
    getPopular(category);
});
$("#searchBtn").on("click", searchTitles);
$("#back").on("click", showPoster);
$("#closeModal").on("click", function() {
    $("#moreInfoModal").removeClass("displayYes")
})
$(document).ready($("#trailer").hide());
$(document).ready($("#back").hide());
$(document).ready($("#searchInput").empty());
