const jwt= require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model');

async function authUser(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Unauthorized , token is missing'})
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token: token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({message:'Unauthorized , token is invalid'})
    }


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            ...decoded,
            _id: decoded.userId || decoded._id,
            userId: decoded.userId || decoded._id
        };
        next();

    } catch (error) {
        return res.status(401).json({message:'Invalid token'})
    }
}

module.exports = {authUser}