require("dotenv").config()
import express from "express"
import routes from './routes/index.js'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
require("./data/reddit-db")
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { readyState } from "./data/reddit-db"



const app = express()
app.use(express.static("./src/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressValidator())
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")
app.use(cookieParser())
let checkAuth = (req, res ,next) => {
  console.log("Checking authentication")
  if( typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null){
    req.user = null
  } else {
    let token = req.cookies.nToken
    let decodedToken = jwt.decode(token, {complete:true}) || {}
    req.user = decodedToken.payload
  }
  res.locals.currentUser = req.user
  next()
}
app.use(checkAuth)





app.use('/',routes.homepage)
app.use('/',routes.posts)
app.use('/',routes.comments)
app.use('/',routes.auth)
// require('./controllers/posts.js')(app)



const port = 3000


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



module.exports = app