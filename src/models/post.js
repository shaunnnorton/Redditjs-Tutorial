import mongoose, { SchemaType } from "mongoose"
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    summary: {type: String, required: true},
    subreddit: { type: Array, required:true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
},{timestamps: {createdAt:"created_at"}})

module.exports = mongoose.model("Post", PostSchema)
