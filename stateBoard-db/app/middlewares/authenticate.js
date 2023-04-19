require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    console.log(req.header)
    let token = req.header('Authorization').split(' ')[1]
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env['JWT_SECRET'])
            req.user = tokenData
            console.log(tokenData)
            next()
        } catch (e) {
            res.json(e.message)
        }
    } else {
        res.status(401).json({
            errors: 'invalid token'
        })
    }
}

const authorize = (roles) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];
}

    // return (req, res, next) => {
    //     console.log(role)
    //     if (req.user.role === role) {
    //         next()
    //     } else {
    //         res.status(403).json({
    //             errors: "page doesn\'t exist"
    //         }) 
    //     }
    // }

    // const authorizeUser=(req,res,next)=>{
    //     console.log(req.user)
    //     if(req.user.role==='admin'){
    //         next()
    //     }
    //     else{
    //         res.status(403).json({
    //             errors:"page doesn\'t exist"
    //         })
    //     }
    // }

    module.exports = {
        authenticateUser,
        authorize
    }