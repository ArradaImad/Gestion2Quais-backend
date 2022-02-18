const jwt = require('jsonwebtoken');
const { verifyToken } = require('../helpers/auth');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = userId;
            next();
        }
    } catch {
        res.status(401).send({ok: false, message: "Invalid request - Unauthorized user"});
    }
}