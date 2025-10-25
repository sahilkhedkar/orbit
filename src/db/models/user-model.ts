import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    }
});

export const User = model("User", userSchema)