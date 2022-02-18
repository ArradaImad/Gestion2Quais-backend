const mongoose = require("mongoose");
const { Schema } = mongoose;

const warehouseSchema = new Schema({
    name: {type: String, required: true},
    surface: {type: Number, required: true},
    docks: {type: Number, required: true},
    manager: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    creatorId: {type: String, required: true},
    appointments: Array,
});

module.exports = mongoose.model('Warehouse', warehouseSchema);