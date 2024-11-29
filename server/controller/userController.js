const router = require('express').Router();
const User = require('../model/user');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId); 
        if (!user) {
            return res.status(404).send({
                message: "User does not exist",
                success: false
            });
        }

        res.status(200).json({
            message: "user fetched successfully!",
            success: true,
            user: user
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
});

router.get('/get-all-user',authMiddleware,async (req,res)=>{
    try {
        const user = await User.find({_id: {$ne: req.body.userId}}); 
        res.status(200).json({
            message: "users fetched successfully!",
            success: true,
            user: user
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
})

module.exports = router;
