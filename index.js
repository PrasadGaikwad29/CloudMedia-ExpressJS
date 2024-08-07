// Create App
const express = require("express");
const app = express();

// To Find the Port
require("dotenv").config();
const PORT = process.env.PORT || 3000

// To Add the Middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/temp'
}));

// To Connect with the Database
const db = require("./config/database");
db.connect();

// To Connect with the Clodinary
const cloudinary =require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// To Mount the API Routes
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

app.listen(PORT, ()=>{
    console.log(`App is Running at ${PORT}`);
})

