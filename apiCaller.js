const fetch = require('node-fetch');

// var url = 'https://api.themoviedb.org/3/movie/278/images?language=en';
// 'https://api.themoviedb.org/3/movie/changes?page=1'
var url = `https://api.themoviedb.org/3`;
var genreURL = 'https://api.themoviedb.org/3/discover'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzYzOWZhYWYwYWY3NTM5N2ZiYmNkYmU3MWI0MTRkOCIsIm5iZiI6MTcyMTk4NDE4Ni4xNzEzMTMsInN1YiI6IjY2YTM2M2I2ZDgzMzY1YThhMzE2NDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D42v3GJtF5bk_welJ995h_QUb_irzoGh_rxm3QNmyNo'
  }
};

async function callAPI(param){
    let result;

    response = await fetch(`https://api.themoviedb.org/3${param}`, options)
    result = await response.json()
    return result
}

async function genreAPI(param){
    genreURL = genreURL + param
    // console.log(url)
    let result;

    response = await fetch(genreURL, options)
        // .then(res => res.json())
        // .then(json => {result = json})
        // .catch(err => console.error('error:' + err));

    result = await response.json()
    return result
}



module.exports = {
    callAPI: callAPI,
    genreAPI: genreAPI
}