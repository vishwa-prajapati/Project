const Listing = require("./model/listing");
const Review = require("./model/review");
const { ListingSchema, reviewSchema } = require("./searver");
const ExpressError = require("./utils/expressError");

module.exports.isLoggedIn = (req,res,next) => {
    req.session.redirectUrl = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error" , "You must be logged in");
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not owner of the listing");
        return res.redirect(`/listing/${id}`)
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    let {error} = ListingSchema.validate(req.body);
    if(error){
    let errorMsg = error.details.map((el) => el.message).join(",");
    console.log(error);
   throw new ExpressError(400, errorMsg);
    }
    next();

};

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
    let errorMsg = error.details.map((el) => el.message).join(",");
    console.log(error);
   throw new ExpressError(400, errorMsg);
    }
    next();

};

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not author of the Review");
        return res.redirect(`/listing/${id}`)
    }
    next();
}