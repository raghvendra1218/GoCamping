var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Home Page
router.get("/", function(req,res){
   res.render("landing"); 
});

//===============
// AUTH ROUTES
//===============

//show Register form
router.get("/register", function(req,res){
    res.render("register");
});

//Logic to handle SignUp request
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err) {
            // console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to the YelpCamp "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show login route
router.get("/login", function(req,res){
    res.render("login");
});

//Logic to handle user login and check if the user cred with the DB
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req,res){
    
});

//Logout logic
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;