const router = require('express').Router();
const User = require('../model/user');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId); 
        if (!user) {
            return res.send({
                message: "User does not exist",
                success: false
            });
        }

        res.json({
            message: "user fetched successfully!",
            success: true,
            user: user
        });
    } catch (err) {
        res.send({
            message: err.message,
            success: false
        });
    }
});

router.get('/get-all-user',authMiddleware,async (req,res)=>{
    try {
        const user = await User.find({_id: {$ne: req.body.userId}}); 
        res.json({
            message: "users fetched successfully!",
            success: true,
            user: user
        });
    } catch (err) {
        res.send({
            message: err.message,
            success: false
        });
    }
})

module.exports = router;
