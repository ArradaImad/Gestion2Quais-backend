const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse');

/* GET users listing. */
router.get('/', warehouseController.listWarehouses);

module.exports = router;
