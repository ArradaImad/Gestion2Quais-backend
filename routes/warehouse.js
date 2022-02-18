const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse');
const auth = require('../middlewares/auth');

/**
 * Methode: GET
 * Role: Gestionnaire
 * Lists the warehouses of a Gestionnaire
 * 
 *  */ 
router.get('/', auth, warehouseController.listMyWarehouses);

/**
 * Methode: POST
 * Role: Gestionnaire
 * Creates a new warehouse
 * 
 */

router.post('/add', auth, warehouseController.createWarehouse);

/**
 * Methode: POST
 * Role: Livreur
 * Search page of all warehouses of all gestionnaires
 */
router.post('/search', auth, warehouseController.listAllWarehouses)


module.exports = router;
