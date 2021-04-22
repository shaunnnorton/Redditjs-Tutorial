import {Router} from 'express'
import Post from "../models/post"
import Comment from "../models/comment"
import Auth from "../utils/Auth"
import User from "../models/user"

const router = Router()


router.post('/posts/:postId/comments',Auth.CheckAuth ,(req,res) => {
    const comment = new Comment({ content:req.body.content, author:req.user._id})
    comment
        .save()
        .then( comment => {
            return Post.findById(req.params.postId)
        })
        .then(post => {
            post.comments.unshift(comment)
            return post.save()
        })
        .then(pass => {
            return User.findById(req.user._id)
            
        })
        .then(user => {
            user.comments.unshift(comment)
            user.save()
            res.redirect(`/posts/${req.params.postId}`)
        })
        .catch( err => {
            console.log(err)
        })
})

export default router