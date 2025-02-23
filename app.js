
require('dotenv').config();

const express = require('express');

const mongoose =require('mongoose');
const ejs = require('ejs');
// const Listing = require('./model/listing');
const path = require('path');
var methodOverride = require('method-override')
const ExpressError = require('./utils/expressError.js');
const listing = require('./routes/listingroute.js');
const reviewroute = require("./routes/reviewroute.js");
const userroute= require("./routes/userroute.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user.js");
const app = express();

const ejsMate = require('ejs-mate');
const { serialize } = require('v8');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'public')));
//const wrapAsync = require('./utils/wrapAsync.js');

// const {ListingSchema} = require("./searver.js");
// const {reviewSchema} = require("./searver.js");
// const review = require('./model/review.js');



// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const MONGO_URL ="mongodb://127.0.0.1:27017/wandeal"
//data base connection

main().then(() => {
    console.log("database connected successfully");
}).catch((err) => {
    console.log("error" , err);
})

async function main() {
    mongoose.connect(MONGO_URL)
}
// app.get('/' , (req,res) => {
//     res.send('i am vishwa prajapati');
// });

let sessionOptions = {
    secret: "jaymakhodiyar",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    app.use((req,res,next) => {
        res.locals.success = req.flash("success");
       res.locals.error = req.flash("error");
       res.locals.currUser = req.user;
        next();
    });

//     app.get("/demo" , async (req,res) =>{
//         let fakeUser = new User({
//             email:"jaimakhodal@gmail.com",
//             username:"vishh",
//         });
// let registeredUser = await User.register(fakeUser , "me@123");
//     })

app.use('/listing' , listing);
app.use("/listing/:id/review" , reviewroute);
app.use("/" , userroute);
    
 
app.all("*" , (req,res,next) => {
    next(new ExpressError(404,"page not found"));
})

//middleware 
app.use((err,req,res,next) => {
    let {statusCode = 500 , message = "somthing went erong"} = err;
    res.render("listings/error.ejs" , {message});
    
    // res.status(statusCode).send(message);
})



app.listen(8080 , () => {
    console.log("searever is started");
})

// app.get('/testinglist' , async (req,res) => {
//    let sampleListing = new Listing({
//     title:"my dream house",
//     description:"it will be greatest one",
//     price:5000000,
//     location:'ahemedabad',
//     country:"gujarat",
//    });

//    await sampleListing.save();
//    console.log('sample saved in database successfully');
//    console.log('testing succesfull');
//    res.send('success');
// })
//                                   -----------------------------------------------------------
// notes

//  type of error 
// 1) clinte side (form validation)
// 2) express error (middlevare)
// 3) mongoose error (searver side error)
// validate listing is used for searver side error handaling
// express error used to handle express error by creating middlevarr
// wrape is used for express error handaling
// bootstrape validation is used for clite side error handaling

//reviews post route 

// app.post("/listing/:id/review", wrapAsync(async (req, res) => {
//     console.log("this is post route working");
//     let { id } = req.params;
//     let list = await Listing.findById(id);

//     if (!list) {
//         throw new ExpressError(404, "Listing not found");
//     }

//     let newReview = new review(req.body.review);

//     if (!req.body.review || !req.body.review.text || !req.body.review.rating) {
//         throw new ExpressError(400, "Invalid review data");
//     }

//     list.reviews.push(newReview);

//     await newReview.save();
//     await list.save();

//     console.log("Review saved");
//     res.status(201).json({ message: "Review saved", review: newReview });
// }));
