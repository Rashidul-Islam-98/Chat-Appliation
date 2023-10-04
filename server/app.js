const express = require("express");
const cors = require("cors");
const route= require("./routes/route");
const connectDatabase = require("./db");
const cloudinary = require("cloudinary");
const app = express();
require("dotenv").config();

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use("/api",route);

app.get("/",(req,res)=>{
    res.send("Welcome to server");
})

module.exports = app;