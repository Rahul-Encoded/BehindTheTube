import mongoose from "mongoose";
// Importing the mongoose library to connect and interact with MongoDB databases.

import { DB_NAME } from "../src/constants.js";
// Importing the name of the database (DB_NAME) from a constants file located in the src directory.


// Function to connect to MongoDB database
// The database is located in another continent, which could lead to higher latency or potential connection issues.
const connectDB = async () => {
    try {
        // Attempting to establish a connection to the MongoDB database
        // Uses an environment variable (MONGODB_URI) to keep sensitive information like the database URI secure.
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        // If the connection is successful, log the host information to the console.
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        // If there's an error during connection, log it to the console.
        console.log("MONGODB connection error", error);

        // Exiting the process with a failure code (1) to indicate that the application cannot proceed.
        process.exit(1);  
    }
}

export default connectDB;
// Exporting the connectDB function so that it can be imported and used in other files.
