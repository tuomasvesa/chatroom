
const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.error(`Failed to connect to MongoDB: ${err.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = connectDB;