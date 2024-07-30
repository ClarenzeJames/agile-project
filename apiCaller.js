const fetch = require('node-fetch');

// var url = 'https://api.themoviedb.org/3/movie/278/images?language=en';
var url = 'https://api.themoviedb.org/3';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzYzOWZhYWYwYWY3NTM5N2ZiYmNkYmU3MWI0MTRkOCIsIm5iZiI6MTcyMTk4NDE4Ni4xNzEzMTMsInN1YiI6IjY2YTM2M2I2ZDgzMzY1YThhMzE2NDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D42v3GJtF5bk_welJ995h_QUb_irzoGh_rxm3QNmyNo'
  }
};

async function callAPI(param){
    url = url + param
    // console.log(url)
    let result;

    response = await fetch(url, options)
        // .then(res => res.json())
        // .then(json => {result = json})
        // .catch(err => console.error('error:' + err));

    result = await response.json()
    return result
}



module.exports = {
    callAPI: callAPI
}