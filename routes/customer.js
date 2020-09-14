const express = require('express');
const router = express.Router();

// Handle incoming GET requests to view all possible items
router.get('/', (req, res, next) => {
    console.log('GET request')
})

// Handle incoming specified GET requests to view single item
router.get('/:invId', (req, res, next) => {
    Inventory.findById(req.params.invId)
    .exec()
    .then(inventory => {
        if(!inventory) {
            return res.status(404).json({
                message: 'Item not found'
            })
        }
        res.status(200).json({
            inventory: inventory
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;