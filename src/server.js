import express from "express"
import routes from './routes/index.js'
import handlebars from 'express-handlebars'


const app = express()
app.use(express.static("./src/public"))

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")


app.use('/',routes.homepage)



const port = 3000


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
