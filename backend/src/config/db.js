const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const tp = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        throw new Error("Database connection failed");
    }
};

module.exports = connectDB;