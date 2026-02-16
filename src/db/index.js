import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connect_instance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Connection HOST: ${connect_instance.connection.host}`)
        console.log(`Connection NAME: ${connect_instance.connection.name}`)
    } catch (error) {
        console.error(error || "Database connection issue")
        process.exit(1)
    }
}

export default connectDB