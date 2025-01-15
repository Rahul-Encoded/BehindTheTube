// Importing necessary modules
import express from "express"; // Importing the Express framework to build the web server
import cors from "cors"; // Importing CORS middleware to handle cross-origin requests
import cookieParser from "cookie-parser"; // Importing middleware to parse cookies from incoming requests

// Creating an Express application instance
const app = express();

// Enabling CORS with specific options
// - 'origin': allows cross-origin requests from the URL specified in the environment variable CORS_ORIGIN
// - 'credentials: true': allows credentials (like cookies or HTTP authentication) to be sent along with the request
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
}));

// Middleware to parse JSON request bodies
// - 'limit: "16kb"': limits the size of JSON request bodies to 16kb to prevent large payloads from being processed
app.use(express.json({
    limit: "16kb",
}));

// Middleware to parse URL-encoded request bodies (used for form submissions)
// - 'extended: true': allows for rich objects and arrays to be encoded into the URL-encoded format
// - 'limit: "16kb"': limits the size of URL-encoded data to 16kb
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

// Serving static files from the 'public' directory
// - This allows access to files like images, CSS, JavaScript, etc. stored in the 'public' folder via the web server
app.use(express.static("public"));

// Middleware to parse cookies from incoming HTTP requests
// - Useful for working with authentication tokens or session data stored in cookies
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// https://localhost:8000/api/v1/users/...whichever route you wish to go
// Exporting the app object to use it in other parts of the application (like server.js)
export { app };
