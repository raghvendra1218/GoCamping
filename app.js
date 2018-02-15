var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    methodOverride = require("method-override"),
  localStrategy = require("passport-local"),
    User        = require("./models/user"),
    seedDB      = require("./seed")
    
var campRoute    = require("./routes/campground"),
    commentRoute = require("./routes/comment"),
    authRoute    = require("./routes/index")

//DB URL 
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

//Require Routes
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(url);
// mongoose.connect("mongodb://Raghav:mummypapa@ds235778.mlab.com:35778/gocamping");
mongodb://Raghav:mummypapa@ds235778.mlab.com:35778/gocamping
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seeding the Database

//PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret: "I love cats!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds",campRoute);
app.use("/",authRoute);
app.use("/campgrounds/:id/comments",commentRoute);
//SCHEMA SETUP

// Campground.create(
//     {
//         name:"Salmon Creek", 
//         image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
//         description: "This is a one Granite rock, with serene atmosphere around. Loved it!!"
        
//     }, function(err, campground){
//         if(err){
//             console.log("SOMETHING WENT WRONG!!");
//         } else {
//             console.log("Campground has been added");
//             console.log(campground);
//         }
//     });
// var campgrounds = [
//     {name:"Muir woods", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},    
//     {name:"Granite Hill", image:"https://farm4.staticflickr.com/3539/3314646074_cb608e578b.jpg"},    
//     {name:"Mountain Goat's rest", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"}    
// ];


//port Connection
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server is listening!!"); 
});