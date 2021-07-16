const exporess = require ('express')
const router = express.Router();

router.get('/api/v1/orders',(req,res) =>{
    res.status(200).json({
        message:"orders were fetched"
    })
})

router.post('/api/v1/orders',(req,res) =>{
    res.status(201).json({
        message:"orders were created"
    })
})