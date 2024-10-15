// require('dotenv').config({path: './env'});   WILL COMPLETELY RUN... NO ISSUE... BUT RUINS CONSISTENCY
import dotenv from "dotenv";

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDB from "../db/index.js"; 

dotenv.config({
    path: './env'
});

/*

import express from "express";
const app = express();

//IIFE (Immediately Invoked Function Expression
//; = cleaning purpose
//Can also make a function normally and call it
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ", error);
        throw error;
    }
})();
*/

connectDB()
    .then(() => {
        // Start the server
        const server = app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });

        // Error handling for the app
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        });

        // Optional: You can also handle server-specific errors
        server.on("error", (error) => {
            console.log("Server Error: ", error);
            throw error;
        });
    })
    .catch((error) => {
        console.log("MONGO db connection failed!!!", error);
    });
