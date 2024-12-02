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
        res.send({
            message:err.message,
            success: false
        })
    }
});

router.get('/get-all-chats',authMiddleware,async(req,res)=>{
    try{
        const allChat = await Chat.find({members: {$in: req.body.userId}});
        console.log(allChat);
        res.status(200).send({
            message: "chats were fetched succesfully!",
            success: true,
            chat: allChat
        })
    }catch(err){
        res.send({
            message:err.message,
            success: false
        })
    }
});

module.exports = router;