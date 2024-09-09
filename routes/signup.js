// routes/signup.js

const express = require("express");
const router = express.Router();

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
                console.log(results)
            }
        })
    })
}

router.get("/", async (req, res, next) => {
    res.render('signUp.ejs', {errorMessage: null})
})

router.post("/", async (req, res, next) => {
    userEmail = req.body.email;
    userName = req.body.username;
    userPassowrd = req.body.password;

    let checkQuery = `SELECT * FROM users WHERE user_email = "${userEmail}"`
    let checks;

    try {
        await queryDB(checkQuery).then(results => {
            if (results) {
                checks = results
                
            }
        })
    } catch (error) {
        next();
    }

    if (checks){
        errorMessage = "Email already Exists, try a different email, or log in"
        res.render("./signUp.ejs",{errorMessage: errorMessage})
    } else{
        let insertQuery = `INSERT INTO users (user_name, user_email, user_password) VALUES ("${userName}","${userEmail}","${userPassowrd}")`
        try {
            await queryDB(insertQuery).then(results => {
                if (results) {
                    res.redirect('./home.ejs')
                }
            })
        } catch (error) {
            
        }
    }
    
})

module.exports = router;