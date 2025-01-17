import mongoose, { Schema } from "mongoose";
// Importing mongoose and its Schema class to define the structure of documents in MongoDB collections.

import jwt from "jsonwebtoken";
// Importing jsonwebtoken for generating access and refresh tokens for user authentication.

import bcrypt from "bcrypt";
// Importing bcrypt for hashing and comparing passwords for security purposes.

const userSchema = new Schema({
    // Schema for user data, defining structure, types, and constraints for each field.

    username: {
        type: String,       // The username field is of type String.
        required: true,     // This field is required.
        unique: true,       // The value must be unique across all users.
        lowercase: true,    // Automatically converts the username to lowercase.
        trim: true,         // Removes whitespace from both ends.
        index: true,        // Indexes this field for efficient querying.
    },
    email: {
        type: String,       // The email field is of type String.
        required: true,     // This field is required.
        unique: true,       // The value must be unique across all users.
        lowercase: true,    // Converts the email to lowercase.
        trim: true,         // Removes whitespace from both ends.
    },
    fullName: {
        type: String,       // Full name of the user.
        required: true,     // This field is required.
        trim: true,         // Trims whitespace from both ends.
        index: true,        // Indexed for fast searching.
    },
    avatar: {
        type: String,       // The URL for the user's avatar image, likely stored on Cloudinary.
        required: true,     // This field is required.
    },
    coverImage: {
        type: String,       // Optional URL for the user's cover image, also likely from Cloudinary.
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,    // References to Video objects (related content user has watched).
            ref: "Video",                   
        }
    ],
    password: {
        type: String,       // The user's password, stored in a hashed format (hashed later in middleware).
        required: [true, "Password is required"],  // Required field with a custom error message if not provided.
    },
    refreshToken: {         // Token used to refresh access tokens without needing to log in again.
        type: String,       // Stored as a string, typically JWT.
    },
}, {
    timestamps: true,       // Automatically manages `createdAt` and `updatedAt` fields.
});

// Middleware function to hash the password before saving the user document to the database.
userSchema.pre("save", async function (next) {
    // If the password field hasn't been modified, skip hashing and continue.
    if (!this.isModified("password")) return next();

    // Hash the password using bcrypt before saving it to the database.
    this.password = await bcrypt.hash(this.password, 10);

    next(); // Proceed to the next middleware.
    // Problem: This approach could potentially cause the password to be rehashed on every save, even if the password hasn't changed.
    // The conditional check above `!this.isModified("password")` helps avoid this issue.
}); 
// Note: Using a regular function here instead of an arrow function is important because
// the `this` keyword is bound to the document in regular functions. Arrow functions do not bind `this`, which is needed here.


// Method to compare a plain-text password with the hashed password stored in the database.
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);  // Compares the provided password with the stored hashed password.
};

// Method to generate an access token for user authentication.
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,          // Embedding the user's ID, username, email, and full name into the token payload.
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,  // Using a secret key stored in environment variables.
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,   // Token expiration time (defined in env variables).
    });
};

// Method to generate a refresh token for refreshing access tokens.
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,  // Embedding only the user's ID in the refresh token.
    },
    process.env.REFRESH_TOKEN_SECRET,   // Using a different secret key for the refresh token.
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,  // Expiration time for the refresh token.
    });
};

// Exporting the User model, which can be used to interact with the 'users' collection in MongoDB.
export const User = mongoose.model("User", userSchema);
