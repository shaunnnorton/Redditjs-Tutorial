import {Router} from 'express'
import Post from "../models/post"
import auth from "../utils/auth"

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
    subreddit:req.body.subreddit.replace(/ /g,'').split(",")
  })
  post.save((err, post) => {
      return res.redirect(`/`)
  })
});

router.get('/', (req, res) => {
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
})

router.get('/posts/:id', (req,res) => {
    Post.findById(req.params.id).lean().populate('comments')
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
