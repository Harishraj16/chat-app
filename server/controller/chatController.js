const router = require('express').Router();
const Chat = require('../model/chat');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-new-chat',authMiddleware,async(req,res)=>{
    try{
        const chat = new Chat(req.body);
        const savedChat = await chat.save(); 

        res.status(201).send({
            message: "chat created succesfully!",
            success: true,
            chat: savedChat
        })
    }catch(err){
        res.status(400).send({
            message:err.message,
            success: false
        })
    }
});

router.get('/get-all-chats',authMiddleware,async(req,res)=>{
    try{
        const allChat = await chat.find({members: {$in: req.body.userId}});

        res.status(200).send({
            message: "chats were fetched succesfully!",
            success: true,
            chat: allChat
        })
    }catch(err){
        res.status(400).send({
            message:err.message,
            success: false
        })
    }
});

module.exports = router;