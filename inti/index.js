const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../model/listing');


const MONGO_URL ="mongodb://127.0.0.1:27017/wandeal"

main().then(() => {
    console.log("database connected successfully");
}).catch((err) => {
    console.log("error" , err);
})
async function main() {
    mongoose.connect(MONGO_URL)
}


const initDb =async () => {
    initData.data = initData.data.map((obj) => ({...obj , owner : "668e617377c4fd3f884de88a"}));
await Listing.deleteMany({});
await Listing.insertMany(initData.data);
console.log('data init successfully');

}

initDb();