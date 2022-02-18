const utils = require('../utils/utils');
const WarehouseSchema = require('../models/warehouse');

const warehouseController = {
    /**
     * Methode: POST
     * @param {*} req 
     * @param {*} res 
     */
    createWarehouse: (req, res) => {    
        try {
            const warehouse = new WarehouseSchema({...req.body, creatorId: req.userId, appointments: []});
            warehouse.save()
                .then(() => res.status(201).json({ ok: true, message: "Warehouse successfully created" }))
                .catch((error) => res.status(400).json({ ok: false, message: "Error while saving data", error: error }));
        } catch (error){
            res.status(500).json({ ok: false, message: error });
        }
    },

    /**
     * Methode: GET
     * @param {*} req 
     * @param {*} res 
     */
    listMyWarehouses: async (req, res) => {
        const warehouses = await WarehouseSchema.find({creatorId: String(req.userId)});
        if (warehouses) {
            res.status(200).json({ok: true, warehouses: warehouses});
        } else if (warehouses.length === 0) {
            res.status(204).json({ok: true, warehouses: []})
        } else {
            res.status(500).json({ok: false, message: "Error while fetching warehouse data"})
        }
    },

    /**
     * Methode: POST
     * @param {*} req 
     * @param {*} res 
     */
    listAllWarehouses: async (req, res) => {
        
    }
}

module.exports = warehouseController;