const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = decodedToken.userId;
        
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({
                message: "Token has expired",
                success: false
            });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).send({
                message: "Invalid token",
                success: false
            });
        } else {
            return res.status(500).send({
                message: "Token verification failed: " + err.message,
                success: false
            });
        }
    }
};

module.exports = authMiddleware;
