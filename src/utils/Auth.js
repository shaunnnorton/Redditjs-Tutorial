module.exports.CheckAuth = (req,res,next) => {
    console.log("FUUUCCCKKK")
    if(!req.user){
      res.status(401)
      res.redirect("/")
    }
    next()
}
