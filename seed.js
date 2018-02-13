var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var   data = [
                {
                    name: "Mensa Rock",
                    image: "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=89f8de1875d71adbd5fff976ac2341be&auto=format&fit=crop&w=967&q=80",
                    description: "Bacon ipsum dolor amet tenderloin jerky salami ribeye landjaeger meatball pork belly leberkas beef ribs kielbasa shoulder strip steak filet mignon sausage. Venison jowl shankle, strip steak chicken pork chop pancetta drumstick beef capicola shank ham hock meatloaf bacon meatball. Porchetta biltong alcatra pork belly venison pork filet mignon, frankfurter tri-tip ham hock sirloin buffalo cupim. Tongue turkey landjaeger pork belly andouille kevin."
                },
                {
                    name: "Rocky Mountain",
                    image: "https://images.unsplash.com/photo-1439123414876-0717652a92a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1d4921e5ec0ec4942a7135fafd3e8ed9&auto=format&fit=crop&w=1052&q=80",
                    description:"Bacon ipsum dolor amet tenderloin jerky salami ribeye landjaeger meatball pork belly leberkas beef ribs kielbasa shoulder strip steak filet mignon sausage. Venison jowl shankle, strip steak chicken pork chop pancetta drumstick beef capicola shank ham hock meatloaf bacon meatball. Porchetta biltong alcatra pork belly venison pork filet mignon, frankfurter tri-tip ham hock sirloin buffalo cupim. Tongue turkey landjaeger pork belly andouille kevin."
                },
                {
                    name: "Aurora Shades",
                    image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=1050&q=80",
                    description: "Bacon ipsum dolor amet tenderloin jerky salami ribeye landjaeger meatball pork belly leberkas beef ribs kielbasa shoulder strip steak filet mignon sausage. Venison jowl shankle, strip steak chicken pork chop pancetta drumstick beef capicola shank ham hock meatloaf bacon meatball. Porchetta biltong alcatra pork belly venison pork filet mignon, frankfurter tri-tip ham hock sirloin buffalo cupim. Tongue turkey landjaeger pork belly andouille kevin."
                },
    
    ];
function seedDB() {
    //Remove all Campgrounds
    Campground.remove({}, function(err) {
        // if(err) {
        //     console.log(err);
        // } 
        // console.log("all campgrounds removed");
        //     data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground){
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("created the campground");
        //             //Create Comments on a campground
        //             Comment.create (
        //                 {
        //                   title : "This Place is great, except for Internet",
        //                   author: "Homer"
        //                 }, function(err,comment){
        //                 if(err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment._id);
        //                     campground.save();
        //                     console.log("Added a new comment");
        //                 }
        //             });
        //         }
        //     });    
        // });
    });
    //Create new Campgrounds
}


module.exports = seedDB;