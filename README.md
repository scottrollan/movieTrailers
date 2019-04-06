# JQDB

Introduction: 

    Our goal was to create a simple yet fast application that provides quick movie info served up with a trailer linked from Youtube. The main focus was to make the information so accessible and fast that users would always have a way to see if they might be interested in a movie before spending the time an money to view it at a theater. 
    
Design Process:

    We decided to go with a single page application because of the ease of use and speed. We wanted the interface to look clean an simple, but flashy in the right areas. The header we made glow, an have a similar look to a classic neon theater sign. We have a dropdown menu that serves as a fast path to discovering what is popular, what is in theaters currently, an what will be coming soon. You also have the ability to search for a specific movie by entering a keyword or title in the search box. The list of movies you get as a result of your search come back in a neat layout of posters that feature a neat animation that shows some basic information of the film.

Technology:

    We used two movie database api's to query for movie title, poster, date released, brief synopsis, an trailer. The first api, OMDb, we used to get the movie poster an id. We used the id to pull from the second api, TMDb. We used that api to pull the synopsis, release dates, the results of the dropdown searchs, and the link to the movie trailer. We used Bootstrap for some styling and for mobile responsiveness. We used Google Fonts for some of the letter styling and FontAwesome to create the search icon.

Future Development:

    For future development on the application, we would like to add a theater near you feature. It would allow the user, after they have found a movie in theaters they are intertested in, to find a theater close to them that is showing the film along with showtimes. Another feature we would like to add is the ability to find films by searching for actor. After a name was entered in the search field, it would return back a list of movies the person was featured in. # movieTrailers
