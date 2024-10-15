// Custom error class extending the built-in Error class in JavaScript
class ApiError extends Error {
    // Constructor to initialize the error object with custom properties
    constructor(
        statusCode,                        // HTTP status code for the error (e.g., 400, 404, 500)
        message = "Something went wrong",  // Default error message if none is provided (a bad practice for real apps, so it's humorously noted here as the "WORST WAY TO SHOW ERROR🤣")
        errors = [],                       // Optional array to hold specific validation or additional error details
        stack = "",                        // Optional custom stack trace
    ) {
        super(message);                    // Calling the parent Error constructor with the message
        this.statusCode = statusCode;      // Assigning the provided status code to the error object
        this.data = null;                  // Placeholder for additional data related to the error (can be used if needed)
        this.message = message;            // Assigning the error message
        this.success = false;              // Setting 'success' to false, indicating the operation failed (useful for API responses)
        this.errors = errors;              // Storing any additional error details

        // If a custom stack trace is provided, use it; otherwise, capture the default stack trace
        if (stack) {
            this.stack = stack;            // Assign custom stack trace if available
        } else {
            Error.captureStackTrace(this, this.constructor);  // Captures stack trace starting from where this error was thrown
        }
    }
}

// Exporting the ApiError class for use in other parts of the application
export { ApiError };
