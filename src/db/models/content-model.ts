import mongoose, {Schema, model} from "mongoose";

const contentSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

export const Content = model("Content", contentSchema) 