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
export default router
