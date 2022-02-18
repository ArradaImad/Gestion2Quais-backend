const jwt = require('jsonwebtoken');
const secret = "secret";

module.exports = {
    generateToken: (id) => {
        return jwt.sign({
            userId: id,
        }, secret, { expiresIn: "24h" });
    },

    verifyToken: (token) => {
        return jwt.verify(token, secret);
    },
}