import { app } from "./app.js"
import connectDB from "./db/index.js";
import dotenv from "dotenv"

// flow of writing code: db -> app.js -> index.js

dotenv.config(
    {
        path: "./.env"
    }
)
/*
app - contains application logic and everything around it
server - allows clients to connect to the application
*/
connectDB()
.then(() => {
    // express app error listener
    app.on("error", (error) => {
        console.error(`Express app error: ${error}`)
        throw error;
    })
    const server = app.listen(process.env.PORT || 3001, () => {
        console.log(`Server listening on: http://localhost:${process.env.PORT}`)
    })

    // Server error listener - handles port already in use, permission errors, etc.
    server.on("error", (error) => {
        console.error("❌ Server failed to start:", error);
        
        // Provide helpful error messages for common issues
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${process.env.PORT || 3001} is already in use`);
        } else if (error.code === 'EACCES') {
            console.error(`Port ${process.env.PORT || 3001} requires elevated privileges`);
        }
        
        process.exit(1); // Exit with failure
    });
})
.catch((error) => {
    console.error(`Failed to start application: ${error}`)
    process.exit(1)
})