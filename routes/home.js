const express = require("express");
const router = express.Router();
const apiCaller = require("../apiCaller.js")

router.get("/",async (req,res,next) => {
    // home page route, to get the top movies, place them in a banner as auto carousell.

    
    try {
        popularMovies = await apiCaller.callAPI('/movie/popular?language=en-US&page=1')
        console.log(popularMovies.results[1].poster_path)
    } catch (error) {
        next(error)
    }
    

    // console.log(popularMovies);
})

module.exports = router;