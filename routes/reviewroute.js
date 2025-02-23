const express = require('express');
const route = express.Router({mergeParams : true});
const {ListingSchema} = require("../searver.js");
const {reviewSchema} = require("../searver.js");
const review = require('../model/review.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const Listing = require('../model/listing');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');



route.post("/",isLoggedIn, wrapAsync( async (req,res) => {
    let list = await Listing.findById( req.params.id);
    
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    list.reviews.push(newReview);
    
    await newReview.save();
    await list.save();
    
    console.log("saved ");
    req.flash("success" , "Review created succesfully");
    res.redirect(`/listing/${list._id}`); 
    
    }));
        
 route.delete("/:reviewId" , isLoggedIn,isReviewAuthor, wrapAsync(async (req,res) => {
        let {id,reviewId} = req.params;
        await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});
        await review.findByIdAndDelete(reviewId);
        req.flash("success" , "Review deleted succesfully");
        res.redirect(`/listing/${id}`);
    }))

    module.exports = route;