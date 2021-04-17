import {Router} from 'express'
import Post from "../models/post"

const router = Router()

router.get('/posts/new', (req,res)=>{
    res.render('posts-new')
})
router.post("/new", (req, res) => {
  const post = new Post(req.body)
  post.save((err, post) => {
      return res.redirect(`/`)
  })
});

router.get('/posts', (req, res) => {
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

router.get('posts/:id', (req,res) => {
    Post.findById(req.params.id).lean()
        .then(post => {
            res.render("posts-show", {post})
        })
        .catch(err => {
            console.log(err.message)
        })
})

router.get("/n/:subreddit", (req,res) => {
  Post.find({subreddit: req.params.subreddit }).lean()
    .then( posts => {
      res.render("posts-index", {posts})
    })
    .catch(err => {
      console.log(err)
    })
})

export default router
