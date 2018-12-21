const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//引入user.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

//DB config 
const db = require("./config/keys").mongoURI;

//使用body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Connect to mongodb
mongoose.connect(db)
.then(()=> console.log("MongoDB Connected"))
.then(err => console.log(err))


//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/",(req,res) => {
//     res.send("Hello Wrold!");
// })

//使用users
app.use("/api/users",users);
app.use("/api/profiles",profiles);

//使用routes
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})
