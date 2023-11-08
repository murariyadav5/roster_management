const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User =  require("./models");
const router = require("./routes/routes.js");
dotenv.config();
const app = express();
mongoose.connect('mongodb://localhost:27017/roster-management').then(()=>{
	console.log("Connected")
}).catch(()=>{
	console.log("Not Connected")
})
app.use(express.json());
app.use("/",router);
app.listen(process.env.APP_PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});


