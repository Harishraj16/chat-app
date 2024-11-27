const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');

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

module.exports = router;