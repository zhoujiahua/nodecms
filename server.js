const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//引入user.js
const users = require("./routes/api/users");

//DB config 
const db = require("./config/keys").mongoURI;

//使用body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Connect to mongodb
mongoose.connect(db)
.then(()=> console.log("MongoDB Connected"))
.then(err => console.log(err))


app.get("/",(req,res) => {
    res.send("Hello Wrold!");
})

//使用users
app.use("/api/users",users);

//使用routes
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})
