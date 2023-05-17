const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


//orders collection
const orderSchema  = new mongoose.Schema(
    {
        Name: String,
        Email: String,
        Medicines:[           
        ],
        Address:String,
        PhoneNumber:Number,
        TotalQuantity:Number,
        TotalPrice:mongoose.Types.Decimal128
    }
)

const Orders = new mongoose.model("Orders", orderSchema);

module.exports = Orders;