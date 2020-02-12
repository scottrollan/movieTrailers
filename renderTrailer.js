/////// See youtube Trailer //////
seeTrailer = (title, overview, vKey, metaData, genres, actors, ratings) => {
    $("#inside-trailer").empty();
    $("#brief").empty();
    $("#movieInfo").empty();
    // $("#back").attr('href', `#${vkey}`)

    const titleHolder = $(`<h5>${title}</h5>`);
    const metaDataHolder = $(`<p id="metaData">${metaData}</p>`);
    const overviewHolder = $(`<p>${overview}</p>`);
    
    const ratingArray = ratings.split(',')
    const ratingList = $('<ul>')
    ratingList.addClass('ratingList')
    ratingArray.map(r => {
      const rli = `<li>${r}</li>`
      ratingList.append(rli)
    })
  
    const actorArray = actors.split(',')
    const actorList = $('<ul>');
    actorList.addClass('actorList')
    actorArray.map(a => {
      const actorName = a.split(' ').join('+')
      const ali = `<a href='https://m.imdb.com/find?navbar-search-category-select=on&q=${actorName}&ref_=nv_sr_sm' target='_blank'><li>${a}</li></a>`
      actorList.append(ali)
    })
    const genresHolder = $(`<div>${genres.toUpperCase().split(',').join('   -   ')}</div>`);
    genresHolder.addClass("movie-tags");
  
    $("#brief")
      .append(titleHolder)
      .append(metaDataHolder)
      .append(overviewHolder)
      .append(ratingList)
  
    $("#movieInfo")
      .append(actorList)
      .append(genresHolder);
  
    const src = `https://www.youtube.com/embed/${vKey}`;
    $("iframe").attr("src", src);
    showTrailer();
  };