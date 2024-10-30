//Instead of writing the entirety of try-catch or Promise.then()... again again everytime we try to estavlish a connection to a new database...
//WHY NOT MAKE A METHOD WHICH WE'LL JUST IMPORT AND PASS PARAMETER!!!

// asyncHandler function to handle asynchronous routes/middleware in Express
const asyncHandler = (requestHandler) => {
    // Returning a new function that handles the request, response, and next middleware
    return (req, res, next) => {
        // Using Promise.resolve() to handle the async function (requestHandler)
        // and catch any errors it throws, passing them to the next middleware (usually error handling)
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export { asyncHandler };


// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async(req, res, next) => {
//     try{
//         await fn(req, res, next);    // Executes the function passed to asyncHandler
//     }
//     catch(error){
//         res.status(err.code || 500).json({
//             success: false,  //for the frontend guy
//             message: err.message,    // Sending error message as response
//         })
//     }
// }