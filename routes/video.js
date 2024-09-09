// routes/video.js

const express = require("express");
const router = express.Router();
const apiCaller = require("../apiCaller.js")

router.get("/",async (req,res,next) => {
    const movieId = req.query.movieId;
    let relatedMovies = [];
    let relatedMoviesArray = []
    // console.log(movieId);


    queryString = `/movie/${movieId}?language=en-US`
    currentMovie = await apiCaller.callAPI(queryString)

    relatedMovieQuery = `/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${currentMovie.genres[0].id}`
    relatedMovies = await apiCaller.genreAPI(relatedMovieQuery);
    // console.log(relatedMovies)

    for(i=0;i < 10;i++){
        let relatedMoviesObj = {
            title: relatedMovies.results[i].title,
            posterPath: relatedMovies.results[i].poster_path,
            id: relatedMovies.results[i].id};

        relatedMoviesArray.push(relatedMoviesObj);
    }
    
    // console.log(relatedMoviesArray)




    movieObject = {title: currentMovie.title,
                   description: currentMovie.overview}

    

    // console.log(movieObject);

    res.render('videoPlaying.ejs', {movie: movieObject, relatedMovies: relatedMoviesArray})
})

module.exports = router;