// require('dotenv').config({path: './env'});   
// This line loads environment variables from a file named '.env' into process.env.
// The code is commented out because it might work, but it could potentially
// break consistency in the application, depending on how dotenv is managed elsewhere in the app.

// Import dotenv to handle environment variables securely
import dotenv from "dotenv";

// Importing the mongoose library, which is used to interact with MongoDB databases
import mongoose from "mongoose"; 

// Importing a constant variable DB_NAME, which is likely the name of the MongoDB database used
import {DB_NAME} from "./constants.js";

// Importing a connectDB function from the db directory that handles the MongoDB connection setup
import connectDB from "../db/index.js"; 

//
import { app } from "./app.js";

// Load environment variables from the .env file using dotenv.
// This allows you to configure sensitive data (e.g., database URIs, API keys) via environment variables.
dotenv.config({
    path: './env' // Specifies the path to the .env file (custom location './env')
});

/*

import express from "express";
// This imports Express, a web framework for Node.js to handle HTTP requests and responses
const app = express();
// Here, we create an instance of the Express app, which will be used to define routes and middleware

//IIFE (Immediately Invoked Function Expression)
// ; = cleaning purpose
// The semicolon prevents issues when concatenating scripts. 
// It's a common practice to ensure that the IIFE is not mistakenly interpreted as part of the previous statement.
// The function defined here is an IIFE, meaning it runs immediately after its definition.
;(async () => {
    try{
        // Asynchronously connecting to MongoDB using mongoose with the MONGODB_URI from environment variables
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        // Handle any errors that occur in the app by logging the error to the console
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;  // Rethrows the error after logging it
        });

        // Start the Express server on the specified PORT from environment variables
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    }
    catch(error){
        // If an error occurs during the async operations (e.g., DB connection), it gets caught here.
        console.error("ERROR: ", error);
        throw error;  // Rethrows the error after logging it
    }
})();
// End of IIFE, which allows the server to start and connect to MongoDB automatically
*/

// Now we call the connectDB function that establishes the connection to MongoDB
connectDB()
    .then(() => {
        // If the connection is successful, start the server using the Express app
        const server = app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
            // Logs the port number where the server is running (uses env variable or defaults to 8000)
        });

        // Global error handler for the Express app, logs and throws any errors that occur
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        });

        // Optionally handle server-specific errors, which are different from application errors.
        // This can capture events like issues with the HTTP server itself (e.g., port conflicts).
        server.on("error", (error) => {
            console.log("Server Error: ", error);
            throw error;
        });
    })
    .catch((error) => {
        // If MongoDB connection fails, it will be caught here, and an error will be logged
        console.log("MONGO db connection failed!!!", error);
    });
