const config = require("dotenv").config()
const morgan = require('morgan')
const express = require('express')
const forumRoutes  = require("./routes/forum");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products")
const bodyParser = require('body-parser')
const mongoose = require ('mongoose');
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello Wasdsorld!')
})

app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({limit: '20mb' , extended:true}))
app.use((req,res) =>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*')
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT','POST','PATCH','DELETE','GET')
    return res.status(200).json({});
  }
})

app.use(forumRoutes)
app.use(userRoutes)
app.use(productRoutes)

app.use((req,res,next)=>{
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next)=> {
  res.status(err.status || 500 )
  res.json({
    error : {
      message: error.message
    }
  })
})

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true })
console.log(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error' , err => console.log(err))
db.once('open',() => console.log('Connected to Mongoose'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
