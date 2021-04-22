import {Router} from 'express'
import Post from "../models/post"
import Comment from "../models/comment"
import Auth from "../utils/Auth"

const router = Router()


router.post('/posts/:postId/comments',Auth.CheckAuth ,(req,res) => {
    const comment = new Comment(req.body)
    comment
        .save()
        .then( comment => {
            return Post.findById(req.params.postId)
        })
        .then(post => {
            post.comments.unshift(comment)
            return post.save()
        })
        .then(post => {
            res.redirect("/")
        })
        .catch( err => {
            console.log(err)
        })
})

export default router