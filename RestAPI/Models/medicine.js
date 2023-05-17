const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


//medicine collection 
const medicineSchema  = new mongoose.Schema(
    {
        MedicineID : Number,
        MedicineName: String,
        MedicineImage:String,
        MedicineDetails: String,
        Quantity:Number,
        Price:mongoose.Types.Decimal128,
        Category:String

    }
)

const Medicines = new mongoose.model("Medicine",medicineSchema);

module.exports = Medicines;
