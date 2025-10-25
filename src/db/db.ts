import mongoose from "mongoose";

export const DB_NAME = "orbit";

await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)