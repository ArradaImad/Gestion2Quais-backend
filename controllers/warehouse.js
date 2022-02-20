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
            const warehouse = new WarehouseSchema({ ...req.body, creatorId: req.userId, appointments: [] });
            warehouse.save()
                .then(() => res.status(201).json({ ok: true, message: "Warehouse successfully created" }))
                .catch((error) => res.status(400).json({ ok: false, message: "Error while saving data", error: error }));
        } catch (error) {
            res.status(500).json({ ok: false, message: error });
        }
    },

    /**
     * Methode: GET
     * @param {*} req 
     * @param {*} res 
     */
    listMyWarehouses: async (req, res) => {
        const warehouses = await WarehouseSchema.find({ creatorId: String(req.userId) });
        if (warehouses) {
            res.status(200).json({ ok: true, warehouses: warehouses });
        } else if (warehouses.length === 0) {
            res.status(204).json({ ok: true, warehouses: [] })
        } else {
            res.status(500).json({ ok: false, message: "Error while fetching warehouse data" })
        }
    },

    /**
     * Methode: POST
     * @param {*} req 
     * @param {*} res 
     */
    listAllWarehouses: async (req, res) => {
        console.log(req.body);
        let min, max;
        switch (req.body.docks) {
            case '1':
                min = 1;
                max = 10;
                break;
            case '2':
                min = 11;
                max = 20;
                break;
            case '3':
                min = 21;
                max = 50;
                break;
            case '4':
                min = 51;
                max = 100;
                break;
            case '5':
                min = 101;
                max = 10000;
                break;
            default:
                min = 0
                max = 10000;
        }
        const warehouses = await WarehouseSchema.find({
            [req.body.name.length && "name"]: { $regex: req.body.name, $options: 'i' },
            [req.body.docks && "docks"]: {$gte : min, $lte: max},
            [req.body.address.length && "address"]: { $regex: req.body.address, $options: 'i' },
        });
        if (warehouses) {
            console.log(warehouses);
            res.status(200).json({ ok: true, warehouses: warehouses });
        } else if (warehouses.length === 0) {
            res.status(204).json({ ok: true, warehouses: [] })
        } else {
            res.status(500).json({ ok: false, message: "Error while fetching warehouse data" })
        }
    }
}

module.exports = warehouseController;