var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//New : Form for adding new comment 
router.get("/new", middleware.isLoggedIn, function(req,res){
    //find campground by Id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground:foundCampground});         
        }
    });
});

//CREATE: Comment Post route Request
router.post("/", middleware.isLoggedIn, function(req,res){
   //llokup campgound using id
   Campground.findById(req.params.id, function(err,campground){
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        //Create new comment
        // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err,comment){
                if(err) {
                    console.log(err);
                } else {
                  //add username and id to a comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                  //Save Comment
                    comment.save();
                 //connect new comment to campground  
                    campground.comments.push(comment._id);
                    campground.save();
                //redirect to campground show page
                    req.flash("success","comment successfully posted!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });   
       }
   });
});

//Route for editing comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("./comments/edit",{campground_id:req.params.id, comment:foundComment});
        }
    });
});

//Comment Update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Comment Delete route
// campgrounds/:id/comments/:comment_id/delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success","Comment successfully deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;