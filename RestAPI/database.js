const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:admin123@medicineapp.ee3cmvl.mongodb.net/MedicineApp?retryWrites=true&w=majority", 
    (err) => {
        if(err){
            console.log("Connection Failed", err)
        }
        else{
            console.log("Connection Success");
        }
    }
)