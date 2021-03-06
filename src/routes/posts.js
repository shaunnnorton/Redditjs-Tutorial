import {Router} from 'express'
import Post from "../models/post"
import auth from "../utils/auth"
import User from "../models/user"



const router = Router()

// console.log(auth.CheckAuth)
// router.use("/posts/new", auth.CheckAuth)

router.get('/posts/new', auth.CheckAuth ,(req,res)=>{
    res.render('posts-new')
})
router.post("/posts/new",auth.CheckAuth ,(req, res) => {
  console.log(req.body)
  const post = new Post({
    title:req.body.title,
    url:req.body.url,
    summary:req.body.url,
    subreddit:req.body.subreddit.replace(/ /g,'').split(","),
    author:req.user._id
  })
  post.upVotes = []
  post.downVotes = []
  post.voteScore = 0
  post
    .save()
    .then(post => {
      return User.findById(req.user._id)
    })
    .then(user => {
      user.posts.unshift(post)
      user.save()
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
});

router.get('/', (req, res) => {
  Post.find({}).lean().populate('author')
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

router.get('/posts/:id', (req,res) => {
    Post.findById(req.params.id).lean().populate("comments")
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

router.put("/posts/:id/vote-up",auth.CheckAuth ,(req,res) => {
  Post.findById(req.params.id).exec((err,post) => {
    post.upVotes.push(req.user._id)
    post.voteScore ++
    post.save()
    res.status(200)
  })
})

router.put("/posts/:id/vote-down",auth.CheckAuth ,(req,res) => {
  Post.findById(req.params.id).exec((err,post) => {
    post.downVotes.push(req.user._id)
    post.voteScore --
    post.save()
    res.status(200)
  })
})

export default router
