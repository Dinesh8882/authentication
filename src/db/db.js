import mongoose from "mongoose";

async function connectedDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectedDB;