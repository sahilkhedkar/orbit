import { Schema , model } from "mongoose";

const LinkSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const Link = model("Link" , LinkSchema)