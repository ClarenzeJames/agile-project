/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);


// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/movie/278/images?language=en';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzYzOWZhYWYwYWY3NTM5N2ZiYmNkYmU3MWI0MTRkOCIsIm5iZiI6MTcyMTk4NDE4Ni4xNzEzMTMsInN1YiI6IjY2YTM2M2I2ZDgzMzY1YThhMzE2NDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D42v3GJtF5bk_welJ995h_QUb_irzoGh_rxm3QNmyNo'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json.posters))
  .catch(err => console.error('error:' + err));