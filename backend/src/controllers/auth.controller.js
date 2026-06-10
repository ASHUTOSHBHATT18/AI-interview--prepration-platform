const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



/**
 * @route POST /api/auth/register
  * @desc Register a new user expected body {username,email,password}
  * @access Public
 */

async function registerUserController(req,res){

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:'All fields are required'});
    }

    const isUserExist = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(isUserExist){
        return res.status(400).json({message:'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign(
        {userId:newUser._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )

    // res.cookie('token',token)

    res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
    });

    res.status(201).json({
        message:'User registered successfully',
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        }
    });

}

/**
 * @route POST /api/auth/login
 * @desc Login a user expected body {email,password}
 * @access Public
 */

async function loginUserController(req,res){

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
    }

    const user = await userModel.findOne(
        {
            email:email
        }
    )

    if(!user){
        return res.status(400).json({message:'user not registered with this email'});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:'Invalid password'});
    }

    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )

    // res.cookie('token',token)

    res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
    });

    res.status(200).json({
        message:'Login successful',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    });
}

/**
    * @route GET /api/auth/logout
    * @desc Logout a user
    * @access Public
 */

async function logoutUserController(req,res){
    
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({message:'No token found'});
    }

    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({message:'Logout successful'});

}

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
*/

async function getMeController(req,res){

    const user = await userModel.findById(req.user.userId)

    res.status(200).json({

        message:'User details fetched successfully',

        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


module.exports = {registerUserController, loginUserController, logoutUserController, getMeController};