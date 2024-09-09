/**
 * index.js
 * This is your main app entry point
 */

// Set up express, bodyparser and EJS
const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();
const SESSION_SECRET = process.env.SESSIONS_SECRET

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // set the app to use ejs for rendering
app.use(express.static(__dirname + "/public")); // set location of static files
// app.use(express.static("public"));

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db", function (err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// midde ware for sessions
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

session.isAuth = false;

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render('home.ejs');
// });

// Handle requests to the home page
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

// Handle requests to the profile page
const profileRoutes = require("./routes/profile");
app.use("/profile", profileRoutes);

// Handle requests to the movie playing page
const videoRoutes = require("./routes/video");
app.use("/video", videoRoutes);

// Handle requests to the log in page
const logInRoute = require("./routes/logIn");
app.use("/login", logInRoute);

// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

// Handle Sign up requests
const signupRoutes = require("./routes/signup");
app.use("/signup",signupRoutes);

// Socket IO stuff
// set up socket IOs
const http = require("http");
const socketIo = require("socket.io");
const server = app.listen(port)
const io = socketIo(server);

// Watch party state
let currentTime = 0;
let isPlaying = false;

io.on("connection", (socket) => {
    console.log("a user has connected");

    socket.emit("syncTime", currentTime);
    socket.emit("playPauseUpdate", isPlaying);

    socket.on("play", () => {
        isPlaying = true;
        io.emit("playPauseUpdate", isPlaying);
    });

    socket.on("pause", () => {
        isPlaying = false;
        io.emit("playPauseUpdate", isPlaying);
    });

    socket.on("seek", (time) => {
        currentTime = time;
        io.emit("syncTime", currentTime);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

setInterval(() => {
    if (isPlaying) {
        currentTime += 1;
        io.emit("syncTime", currentTime);
    }
}, 1000);

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('video-time', (time) => {
//       socket.broadcast.emit('sync-video-time', time);
//     });

//     socket.on("connect_error", (err) => {
//         console.log(`connect_error due to ${err.message}`);
//       });
  
//     socket.on('play', () => {
//         console.log('play received')
//         socket.broadcast.emit('play')
//     });

//     socket.on('pause', () => {
//         console.log('pause received')
//         socket.broadcast.emit('pause')
//     });
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });