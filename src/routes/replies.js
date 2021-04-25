import { Router } from "express"
import Post from "../models/post"
import Comment from "../models/comment"
import User from "../models/comment"
import CheckAuth from "../utils/Auth"

const router = Router()

router.get("/posts/:postId/comments/:commentId/replies/new", CheckAuth.CheckAuth ,(req,res) => {
    let currentUser = req.user
    let post
    Post.findById(req.params.postId).lean()
        .then(p => {
            post = p
            return Comment.findById(req.params.commentId).lean()
        })
        .then(comment => {
            res.render("replies-new", {post, comment, currentUser})
        })
        .catch( err => {
            console.log(err.message)
        })
})
router.post("/posts/:postId/comments/:commentId/replies", CheckAuth.CheckAuth ,(req, res) => {
    const reply = new Comment(req.body)
    reply.author = req.user._id
    Post.findById(req.params.postId)
        .then(post => {
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId)
            ])
            .then(([reply, comment]) => {
                comment.comments.unshift(reply._id)
                return Promise.all([
                    comment.save()
                ])
            })
            .then(() => {
                res.redirect(`/posts/${req.params.postId}`)
            })
            .catch(console.error)
            return post.save()
        })
        
        
   
})






module.exports = router