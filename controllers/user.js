const UserSchema = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/auth');

const connectUser = async (email, password) => {
    try {
        const user = await UserSchema.findOne({ email: String(email) });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            return match? {id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, profile: user.profile} : false;
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
                const token = generateToken(response.id);
                res.status(200).json({ ok: true, message: "Connection successful", token: token, user: response });
            } else {
                res.status(200).json({ ok: false, message: "No user found" });
            }
        } catch (err) {
            console.error(err);
        }
    },

}

module.exports = userController;