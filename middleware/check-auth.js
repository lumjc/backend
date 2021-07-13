const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log('hello')
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json ({
            message: 'Auth failed'

        })
    }
    

}