module.exports.CheckAuth = (req,res,next) => {
    if(!req.user){
      //res.status(401)
      return res.redirect(401,"/login")
    }
    next()
}
