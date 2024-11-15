import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const mongoClient = connectDB();

async function connectDB() {
    try {
        const client = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
        });
        console.log("Connected to MongoDB");
        return client;
        
    } catch (error) {
        console.error(error);
        console.log("COULD NOT CONNECT TO MONGODB, exiting...");
        process.exit(1);
    }
}

export default mongoClient;

