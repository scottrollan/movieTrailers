seeModal = (title, overview, metaData, genres, actors, ratings) => {
    $('#modalTitle').empty();
    $('#modalBody').empty();
    $('.blurb').empty();
  
  const actorArray = actors.split(",")
  const actorList = $("<ul>")
  actorList.addClass("actorList")
  actorList.attr("id", "actorList")
  actorArray.map(a => {
    const actorName = a.split(" ").join("+");
    const ali = `<a href='https://m                                 .imdb.com/find?navbar-search-category-select=on&q=${actorName}&ref_=nv_sr_sm' target='_blank'><li>${a}</li></a>`;
    actorList.append(ali);
  });

  const ratingArray = ratings.split(",")
  const ratingList = $('<ul>')
  ratingList.addClass('ratingList')
  ratingArray.map(r => {
      const rli = $(`<li>${r}</li>`)
      ratingList.append(rli)
  })

  const footerBlurb = $(`<span>${metaData}</span>`)
  footerBlurb.addClass('blurb')

  $("#modalTitle").append(title);
  $("#modalBody").append(`<p>${overview}</p>`)
  $("#modalBody").append(`<p>${genres.split(',').join('   -   ').toUpperCase()}</p>`)
  $("#modalBody").append(ratingList)
  $("#modalBody").append(actorList)

  $("#modalFooter").prepend(footerBlurb)

  $("#moreInfoModal").addClass("displayYes");
};
