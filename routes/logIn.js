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

function isLoggedIn(){
    if(req.session.isAuth == undefined){
        res.redirect("./login")
    }
}

router.get("/", async (req,res,next) => {
    res.render('logIn.ejs')
})

router.post("/", async (req,res,next) => {
    userEmail = req.body.email
    userPassword = req.body.password

    let query = `SELECT * FROM users WHERE user_email = "${userEmail}" AND user_password = "${userPassword}"`

    try {
        await queryDB(query).then(result => {
            if (result){
                req.session.isAuth = true
                req.session.userId = result[0].user_id
                req.session.user_name = result[0].user_name

                res.redirect(`/profile/${req.session.userId}`)
            }
        })
    } catch (error) {
        next();
    }
})

module.exports = router;