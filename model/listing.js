const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
    title:
    {
      type:String,
      
    },
    description:{
      type :String,
      // required:true
    },
    price:{
      type: Number , 
     // required:true
    },
    image:{
       url: String,
       filename:String,
    },
    location:{type:String , 
     // required:true
    },
    country:{type: String , 
     // required:true
    },
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"review",
      }
    ],
    owner : {
      type:Schema.Types.ObjectId,
      ref: "User",
    }
});

listingSchema.post( "findOneAndDelete" ,async (listing) =>{
  if(listing){
    await review.deleteMany({_id: {$in : listing.reviews}})
  }
} )

const Listing = mongoose.model('Listing' , listingSchema);
module.exports = Listing;