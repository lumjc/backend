const config = require("dotenv").config()
const express = require('express')
const forumRoutes  = require("./routes/forum");
const userRoutes = require("./routes/user");
const bodyParser = require('body-parser')
const mongoose = require ('mongoose');
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Hello Wasdsorld!')
})

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '20mb' , extended:true}))

app.use(forumRoutes)
app.use("/user", userRoutes)


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true })
console.log(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error' , err => console.log(err))
db.once('open',() => console.log('Connected to Mongoose'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
