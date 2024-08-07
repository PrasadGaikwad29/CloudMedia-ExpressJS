const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        ssl:true
    })
    .then(()=>{
        console.log("Database Connection Successful");
    })
    .catch((error)=>{
        console.log("Database Connection Issue");
        console.error(error);
        process.exit(1);
    });
};