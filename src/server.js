require("dotenv").config()
import express from "express"
import routes from './routes/index.js'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
require("./data/reddit-db")
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"


const app = express()
app.use(express.static("./src/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressValidator())
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")
app.use(cookieParser())

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