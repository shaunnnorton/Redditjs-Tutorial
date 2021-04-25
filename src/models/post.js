import mongoose, { SchemaType } from "mongoose"
const Schema = mongoose.Schema
import Populate from "../utils/autopopulate"

const PostSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    summary: {type: String, required: true},
    subreddit: { type: Array, required:true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}
},{timestamps: {createdAt:"created_at"}})

PostSchema
    .pre("findOne", Populate('author'))
    .pre('find', Populate('author'))


module.exports = mongoose.model("Post", PostSchema)
