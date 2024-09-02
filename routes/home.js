const express = require("express");
const router = express.Router();
const apiCaller = require("../apiCaller.js")

function isLoggedIn(req,res,next){
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("./login")
    }
}

router.get("/",isLoggedIn,async (req,res,next) => {
    // home page route, to get the top movies, place them in a banner as auto carousell.
    const selectedGenre = req.query.genre || '28';
    let popMovieArr = []
    let genreMovieArr = []
    
    try {
        // top most banner will be popular movies
        popularMovies = await apiCaller.callAPI('/movie/popular?language=en-US&page=1')
        console.log(popularMovies)
        for (i=0;i < popularMovies.results.length;i++){
            // popular movie for top carousell
            let popMovieObj = { posterPath: popularMovies.results[i].poster_path, genreID: popularMovies.results[i].genre_ids }
            popMovieArr.push(popMovieObj);
        }
        if(selectedGenre){
            console.log(selectedGenre)
            genreMovies = await apiCaller.genreAPI('/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' + selectedGenre);
            // console.log(genreMovies)
            
            // if (popularMovies.results[i].genre_ids.includes(parseInt(selectedGenre))){
            //     let movieObj = { posterPath: popularMovies.results[i].poster_path, genreID: popularMovies.results[i].genre_ids }
            //     movieArr.push(movieObj)
            // }
            for (i=0;i < genreMovies.results.length;i++){
                let genreMovieObj = {posterPath: genreMovies.results[i].poster_path}
                genreMovieArr.push(genreMovieObj)
            }
        }

        console.log(selectedGenre)
        res.render('home.ejs', {popMovies: popMovieArr, genreMovies: genreMovieArr, selectedGenre: selectedGenre})

        // if (popularMovies.results[1].genre_ids.includes(28)){
        //     console.log("yeet")
        // }
        // console.log(popularMovies.results[1]) //  way to access the poster path
        // loop through popularMovies.results, access the .poster_path, insert into another array, pass that arrray into the EJS template
        // eg. res.render('home.ejs', {popularMovies: [theArrayName]})

        // bottom carousel will be 'trending API'

        
        
    } catch (error) {
        next(error)
    }
    

    // console.log(popularMovies);
})

module.exports = router;