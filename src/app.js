import express from "express"

const app = express()

// middlewares setup
// Mid-1: express.json() -> attaches json data (which client sends) to req.body
app.use(express.json(
    {
        limit: "16kb" // max size of payload allowed
    }
))

/*
    // If client sends Content-Type: application/json
    // → express.json() parses it
    
    // If client sends Content-Type: application/x-www-form-urlencoded
    // → express.urlencoded() parses it

*/

// Mid-2: express.urlencoded() -> converts HTML form data to JS object to req.body
app.use(express.urlencoded(
    {
        extended: true,
        limit: "16kb"
    }
))

// Mid-3: express.static() -> if a req has some files which are there in public directory, then it serves that file directly
app.use(express.static("public"))

// routes setup
import notes_router from "./routes/notes.routes.js"
app.use("/api/v1/notes", notes_router)

import healthcheck_router from "./routes/healthcheck.routes.js"
app.use("/", healthcheck_router)

// global error handler
app.use((err, req, res, next) => { // middleware with these four arguments is error handling middleware
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    if (err.name === "CastError") {
        statusCode = 400
        message = "Resource not found, Invalid id"
    } else if (err.code === 11000) {
        statusCode = 400
        message = "Duplicate field value entered"
    } else if (err.name === "ValidationError") {
        statusCode = 400
        message = Object.values(err.errors).map((val) => val.message).join(", ")
    }

    // Note: return 'res' will return the response back to client, ex functions: res.redirect(), res.send() -> sends generic data, res.json() -> sends any data but in JSON format [good for API designs], res.status() 
    res.status(statusCode).json(
        {
            success: false,
            message,
            errors: err.errors || [],
            stack: err.stack
        }
    )
})

export { app }