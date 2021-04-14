import {Router} from 'express'
import Post from "../models/post"

const router = Router()

router.get('/new', (req,res)=>{
    res.render('posts-new')
})
router.post("/new", (req, res) => {
  const post = new Post(req.body)
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

router.get('/:id', (req,res) => {
    Post.findById(req.params.id).lean()
        .then(post => {
            res.render("posts-show", {post})
        })
        .catch(err => {
            console.log(err.message)
        })
})
export default router
