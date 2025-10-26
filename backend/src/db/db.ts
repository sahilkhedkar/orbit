import mongoose from "mongoose";

export const connectDB = async(): Promise<void> => {
    try {
        if(!process.env.MONGO_URL) {
            throw new Error(`Mongo Url is not defined in the .env`)
        }
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongoose`);
    } catch (error) {
        console.error(`MongoDb connection failed`, error),
        process.exit(1)
    }
}