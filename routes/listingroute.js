const express = require('express');
const route = express.Router();
var methodOverride = require('method-override');
const Listing = require('../model/listing');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js")
const multer  = require('multer');
const {storage} = require("../cloudinaryCofig.js")
const upload = multer({ storage })
//searver side validation
//validate function


//index route
route.get('/' , wrapAsync (async (req,res) => {
    let allList = await Listing.find({});
  res.render('listings/index.ejs' , {allList});
  
  }));
  
  //new rout
  route.get('/new' ,isLoggedIn, (req,res) => {
      res.render('listings/new.ejs');
  })
  
  //create route
    // if(!req.body.listing){
      //     throw new ExpressError(400 , "send valid data for listing");
      // }
  route.post('/' ,isLoggedIn , upload.single('listing[image]'),
   wrapAsync (async (req,res) => {
    let url =  req.file.path;
    let filename = req.file.filename;
      let newList =  new Listing(req.body.listing);
      console.log(newList)
      newList.owner = req.user._id;
      newList.image = {url,filename};
   await newList.save();
   req.flash("success" , "New listing created");
   res.redirect('/listing')
   }));

// route.post("/" , async (req,res) => {
// res.send(req.file);
// })
  
  //show rout
  route.get('/:id', wrapAsync (async (req,res) => {
      let {id} = req.params;
     let list= await Listing.findById(id).populate({path :"reviews" , populate: { path: "author",}}).populate("owner");
     if(!list){
        req.flash("error" , "Listing you requested does not exist!");
        res.redirect("/listing");
     }
     res.render('listings/show.ejs' , {list});
  
  }));
  
  //edit rout
  route.get('/:id/edit' ,isLoggedIn,isOwner,wrapAsync (async (req,res) => {
      let {id} = req.params;
      let list= await Listing.findById(id);
      if(!list){
        req.flash("error" , "Listing you requested does not exist!");
        res.redirect("/listing");
     }
     let originalImageUrl = list.image.url
     originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_300,w_250")
      res.render('listings/edit.ejs' , {list , originalImageUrl});
  
  }));
  
  //update route
  route.put('/:id' ,isLoggedIn,isOwner,upload.single('listing[image]'),validateListing ,wrapAsync (async (req,res) => {
      let {id} = req.params;
      let list = await Listing.findByIdAndUpdate(id, {...req.body.listing});
      if(typeof req.file != "undefined"){
      let url =  req.file.path;
      let filename = req.file.filename;
      list.image = {url,filename};
      await list.save();
      }
      req.flash("success" , "Edit successfully");
    res.redirect('/listing');
  
  }));
  
  route.delete('/:id' ,isLoggedIn,isOwner, wrapAsync( async (req,res) => {
      let {id} = req.params;
      await Listing.findByIdAndDelete(id, {...req.body.listing});
      req.flash("success" , "Deleted succesfully");
      res.redirect('/listing');
  }));
  
 module.exports = route;