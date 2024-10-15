// Class to create a standardized API response
class ApiResponse {
    // Constructor to initialize the response object
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;   // HTTP status code (e.g., 200 for success, 404 for not found, etc.)
        this.data = data;               // The actual data or payload that the API is returning (e.g., JSON object, array)
        this.message = message;         // A message describing the outcome (default is "Success")
        this.success = statusCode < 400 // Boolean value indicating if the request was successful (status codes below 400 are considered successful)
    }
}
