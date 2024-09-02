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

router.get("/",isLoggedIn , async (req,res,next) => {
    let movieList;
    let watchHist = []
    let likedMoviesArray = []

    movieList = await apiCaller.callAPI('/movie/changes?page=1')

    for(i=0; i < 20;i++){
        // console.log(movieList.results[i].id)
        if (!movieList.results[i].adult){
            // ***
            queryString = `/movie/${movieList.results[i].id}?language=en-US`
            watchHistMovie = await apiCaller.callAPI(queryString)
            if (watchHistMovie.poster_path){
                let watchHistObj = {id: movieList.results[i].id, posterPath: watchHistMovie.poster_path}
                watchHist.push(watchHistObj)
            }
        }
    }

    for(i=21; i < 40;i++){
        // console.log(movieList.results[i].id)
        if (!movieList.results[i].adult){
            queryString = `/movie/${movieList.results[i].id}?language=en-US`
            likedMovie = await apiCaller.callAPI(queryString)
            if (likedMovie.poster_path){
                let likedMovieObj = {id: movieList.results[i].id, posterPath: likedMovie.poster_path}
                likedMoviesArray.push(likedMovieObj)
            }
        }
    }


    console.log(watchHist)
    console.log(likedMoviesArray)

    res.render("profilePage.ejs", {watchHist: watchHist, likedMoviesArray: likedMoviesArray})
})




module.exports = router;