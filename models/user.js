const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);