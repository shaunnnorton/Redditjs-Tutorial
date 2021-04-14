import Post from "../models/post"

module.exports = app => {
  // CREATE
  app.post("/posts/new", (req, res) => {
    const post = new Post(req.body)
    post.save((err, post) => {
        return res.redirect(`/`)
    })
  });

  app.get('/posts', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render('posts-index', { posts });
      })
      .catch(err => {
        console.log(err.message);
      })
  })

};
