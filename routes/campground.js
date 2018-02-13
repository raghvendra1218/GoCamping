var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//INDEX: Campgrounds Get request route
router.get("/", function(req,res) {
    Campground.find({}, function (err,allCampgrounds) {
        // console.log(req.user);
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }   
    });
});

//CREATE: Campgrounds Post request route
router.post("/", middleware.isLoggedIn, function(req,res){
    var camp = req.body.newcamp;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {name:camp, image:image, price:price, description:description, author:author};
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");      
        }
    })
});

//NEW: Campground new form page
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW: Route for each camp details
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
        if(err || !foundCampground) {
            req.flash("error","Campgroundnot found");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {foundCampground:foundCampground});
        }
    });
    //Render the page with the matching id.
});

//EDIT Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.render("./campgrounds/edit", {foundCampground:foundCampground});          
        }
    });
   
});

//UPDATE Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update the campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
           res.redirect("/campgrounds/"+req.params.id); 
        }
    });
    //Redirect to SHOW page
});

//DESTROY Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Campground successfully deleted!");
           res.redirect("/campgrounds"); 
        }
    });
});

module.exports = router;