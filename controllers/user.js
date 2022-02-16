const UserSchema = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// const connectUser = async (email, password) => {
//     try {
//         let user = await UserSchema.findOne({ email: email }, (err, user) => {
//             const match = await bcrypt.compare(password, user.password);
//             console.log("match", match);
//             return match;
//         }).clone();
//         return user;
//     } catch (err) {
//         console.error(err);
//     }
    
// }

const connectUser = async (email, password) => {
    try {
        const user = await UserSchema.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            return match;
        }
    } catch (err) {
        console.error(err);
    }
    return false;    
}

const userController = {
    register: (req, res) => {
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        });
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = new UserSchema({
                ...req.body,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ ok: true, message: "User created" }))
                .catch(error => res.status(400).json({ error }));
        })
    },

    login: async (req, res) => {
        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        });
        try {
            let response = await connectUser(req.body.email, req.body.password);
            if (response) {
                const token = jwt.sign({
                    userId: req.body.email,
                }, 'secret', { expiresIn: "24h" });
                res.status(200).json({ ok: true, message: "Connection successful", token: token });
            } else {
                res.status(200).json({ ok: false, message: "No user found" });
            }
        } catch (err) {
            console.error(err);
        }
    },
}

module.exports = userController;