const utils = require('../utils/utils');
// const fs = require('fs');
//const ContactSchema = require('../model/model');

const warehouseController = {
    listWarehouses: (req, res) => {
        res.status(200).json({warehouses : utils.warehouses});
    },
}

module.exports = warehouseController;