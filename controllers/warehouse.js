const utils = require('../utils/utils');
// const fs = require('fs');
//const ContactSchema = require('../model/model');

const warehouseController = {
    listWarehouses: (req, res) => {
        res.set({"Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true });
        res.status(200).json(utils.warehouses);
    },
}

module.exports = warehouseController;