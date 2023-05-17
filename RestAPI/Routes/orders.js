const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
require('../database.js');
const Order = require('../Models/order');
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', async (req, res, next) => {  //to get all orders
    try {
        const result = await Order.find();
        res.send(result);
    }
    catch {
        res.send('Error' + err);
    }
});


router.post('/order', async (req, res, next) => {   // to add the order
    try {
       const result =req.body;
       const order = new Order({
        Name: result.user,
        Email: result.email,
        Medicines:result.Items,
        Address:result.order.Address,
        PhoneNumber:result.order.PhoneNumber,
        TotalPrice:result.TotalPrice
        });

        const dataRes = await order.save();
        return res.status(200).json({ 
            message: "order placed succesfully" 
        })
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
});

module.exports = router;