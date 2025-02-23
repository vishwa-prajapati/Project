const express = require('express');
const route = express.Router();
const User = require("../model/user");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {saveRedirectUrl} = require("../middleware");

route.get("/signup" , (req,res) => {
    res.render("users/signup.ejs");
});

route.post("/signup" ,wrapAsync ( async(req,res) =>{
    try{ 
    let {username,email,password} = req.body.user;
    const newUser = await new User({username, email});
    const registeredUser = await User.register(newUser, password)
console.log(registeredUser);
req.login(registeredUser ,(err) => {
    if(err){
        return next(err)
    }
    req.flash("success" , "welcome to wanderlust");
    res.redirect("/listing");
})}catch(e)
{
    req.flash("error" , e.message);
    res.redirect("/signup");
}
}) );

//login
route.get("/login" , (req,res) => {
    res.render("users/login.ejs");
});

//login post
route.post("/login" ,saveRedirectUrl,passport.authenticate('local' ,
     { failureRedirect: '/login' , failureFlash : true}), 
     async(req,res) =>{
        req.flash("success" , "welcome back to wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listing" ;
res.redirect(redirectUrl);
})  

//logout
route.get("/logout" , (req,res,next) => {
    req.logOut((err) => {
        if(err){
return next(err)
        }
        req.flash("success" , "you are logged out");
        res.redirect("/listing");
    })
})

module.exports = route;