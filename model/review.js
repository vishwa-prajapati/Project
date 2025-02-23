const mongoose = require("mongoose");
const Schema =  mongoose.Schema

const reviwSchema = new Schema({
    comments: String,
    rating: {
        type:Number,
        min:1,
        max:5,
    } ,
    created_at : {
        type:Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

const review = mongoose.model("review" , reviwSchema);

module.exports = review;