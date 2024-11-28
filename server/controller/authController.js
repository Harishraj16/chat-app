const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

router.post('/signup',async (req,res)=>{
    try{

        //1. check if user already exists
        const user = await User.findOne({email: req.body.email});

        //2. if yes senf error response
        if(user){
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        //3. encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;

        //4. save the new user in the db
        const newUser = new User(req.body);
        await newUser.save();
        res.json({
            message: 'User created successfully',
            success: true
        })

    }catch(err){
        res.status(500).send({
            message:err.message,
            success: false
        })
    }
});

router.post('/login',async (req,res)=>{
    try{
        //1. check if user exists
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                message: 'User does not exists',
                status: false
            })
        }
        //2. check password
        const isvalid = await bcrypt.compare(req.body.password,user.password);
        if(!isvalid){
            return res.status(400).json({
                message: "incorrect password",
                status: false
            })
        }
        //3. log in and give jwt
        const token = await jwt.sign({userId: user._id},process.env.SECRET_KEY);
        res.status(200).json({
            message:"user login successful!",
            status: true,
            token: token
        })
    }catch(err){
        res.status(500).send({
            message:err.message,
            success: false
        })
    }
});

module.exports = router;