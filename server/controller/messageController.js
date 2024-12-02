const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const chat = require('../model/chat');
const message = require('../model/message')

router.post('/new-message',authMiddleware,async(req,res)=>{
    try{
        console.log("hi");
        //1. Store the message in message collection
        const newMessage = new message(req.body);
        const savedMessage = await newMessage.save();

        //2. update the message in chats collection
        const currentChat = await chat.findById({_id: req.body.chatId});
        currentChat.lastMessage = savedMessage._id;
        currentChat.unreadMessageCount += 1;
        await currentChat.save();


        // const currentChat = await chat.findByIdAndUpdate({
        //     _id: req.body.chatId
        // },{
        //     lastMessage: savedMessage._id,
        //     $inc: {unreadMessageCount: 1}
        // });

        res.status(201).send({
            message: 'Message sent successfully',
            success: true,
            data: savedMessage
        })

    }catch(err){
        res.status(500).json({
            message:err.message,
            success: false
        
        })
    }
})

router.get('/get-all-messages/:chatId',authMiddleware,async (req,res)=>{
    try{
        const allMessages = await message.find({chatId: req.params.chatId}).sort({createdAt: 1});
        res.status(200).send({
            message: 'All messages fetched successfully',
            success: true,
            data: allMessages
        })
    }catch(err){
        res.status(400).send({
            message: err.message,
            success: false
        })
    }
})

module.exports = router;