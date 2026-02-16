/**
 * Custom Error class to standardize error responses across the API.
 * Extends the built-in Error class to include HTTP status codes and detailed validation errors.
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
     * @param {string} message - Human-readable error message
     * @param {Array} errors - Array of detailed error objects (e.g., validation errors)
     * @param {string} stack - Custom stack trace (optional)
     */
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        // Call the parent Error constructor to set the message
        super(message)

        this.statusCode = statusCode
        this.data = null // Standardize error response structure (data is null for errors)
        this.message = message
        this.success = false // success is always false for errors
        this.errors = errors // Array to hold specific validation or operational errors

        // Handle stack trace capturing
        if (stack) {
            this.stack = stack
        } else {
            // Capture stack trace excluding the constructor call for cleaner logs
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }