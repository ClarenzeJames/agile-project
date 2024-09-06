const express = require("express");
const router = express.Router();
const apiCaller = require("../apiCaller.js")

// Helper Function to assist in querying the database
function queryDB(query){
    return new Promise ((resolve,reject) => {
        global.db.all(query, (err,results) =>{ 
            if(err){
                console.log("not success in the query")
                console.log(err)
                reject(err)
            }else{
                console.log("success in the query")
                resolve(results)
            }
        })
    })
}

function isLoggedIn(req,res,next){
    if(req.session.isAuth){
        next();
    }else{
        res.redirect("/login")
    }
}

router.get("/:id",isLoggedIn , async (req,res,next) => {
    console.log("enter profile/id")
    let userId = req.params.id
    let userName;

    let query = `SELECT U.user_id, U.user_name,
                 F.favourites_id, F.user_id, F.favourites 
                 FROM users AS U
                 JOIN user_favourites AS F ON U.user_id = F.user_id
                 WHERE U.user_id = "${userId}"`

    // let query = `SELECT * FROM user_favourites`

    try {
        await queryDB(query).then(results => {
            console.log(JSON.parse(results[0].favourites))
            userName = results[0].user_name
        })
    } catch (error) {
        
    }

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


    // console.log(watchHist)
    // console.log(likedMoviesArray)

    res.render("profilePage.ejs", {watchHist: watchHist, likedMoviesArray: likedMoviesArray,userName: userName})
})




module.exports = router;