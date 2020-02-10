/////// See youtube Trailer //////
seeTrailer = (title, overview, vKey, metaData, genres, actors, ratings) => {
    $("#inside-trailer").empty();
    $("#brief").empty();
    $("#movieInfo").empty();
  
    const titleHolder = $(`<h5>${title}</h5>`);
    const metaDataHolder = $(`<p id="metaData">${metaData}</p>`);
    const overviewHolder = $(`<p>${overview}</p>`);
    
    const ratingArray = ratings.split(',')
    const ratingsHolder = $('<ul>')
    ratingsHolder.addClass('ratingList')
    ratingArray.map(r => {
      const rli = `<li>${r}</li>`
      ratingsHolder.append(rli)
    })
  
    const actorArray = actors.split(',')
    const actorsHolder = $('<ul>');
    actorsHolder.addClass('actorList')
    actorArray.map(a => {
      const actorName = a.split(' ').join('+')
      const ali = `<a href='https://www.imdb.com/find?navbar-search-category-select=on&q=${actorName}&ref_=nv_sr_sm' target='_blank'><li>${a}</li></a>`
      actorsHolder.append(ali)
    })
    const genresHolder = $(`<div>${genres.toUpperCase().split(',').join('   -   ')}</div>`);
    genresHolder.addClass("movie-tags");
  
    $("#brief")
      .append(titleHolder)
      .append(metaDataHolder)
      .append(overviewHolder)
      .append(ratingsHolder)
  
    $("#movieInfo")
      .append(actorsHolder)
      .append(genresHolder);
  
    const src = `https://www.youtube.com/embed/${vKey}`;
    $("iframe").attr("src", src);
    showTrailer();
  };