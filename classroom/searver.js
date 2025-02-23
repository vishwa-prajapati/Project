const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({secret : "jaymakhodal"}));

app.get( "/test" , (req,res) => {
    res.send("test successfull");
})


app.listen(8080 , () => {
    console.log("searever is started");
})