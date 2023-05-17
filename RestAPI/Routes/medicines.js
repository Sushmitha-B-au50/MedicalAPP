const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
require('../database.js');
const Medicine = require('../Models/medicine');
const cloudinary =  require('../Config/cloudinaryConfig.js')
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', async (req, res, next) => {  //to get all Medicines
    try {
        const result = await Medicine.find();
        res.send(result);
    }
    catch {
        res.send('Error' + err);
    }
});


router.post('/addMed', async (req, res, next) => {   // to add the Medicine  using cloudinary to directly storing the images
    try {
       const result =req.body;
        const medicineImage = await cloudinary.uploader.upload(result.MedicineImage, {
            public_id: 'MedicineImage ' + result.MedicineID,
            width: 500,
            height: 650,
            crop: 'fill',
            folder: 'Medicines'
        });

        const medicine = new Medicine({
            MedicineID: result.MedicineID,
            MedicineImage: medicineImage.secure_url,
            MedicineName: result.MedicineName,
            MedicineDetails: result.MedicineDetails,
            Quantity: result.Quantity,
            Price: result.Price,
            Category:result.Category
        });

        const dataRes = await medicine.save();
        return res.status(200).json({ 
            message: "medicine added succesfully" 
        })
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
});



router.put('/:id', async (req, res, next) => {  //to update medicine
    try
    {
        const medicineToUpdate = await Medicine.findOneAndUpdate({ "MedicineID": req.params.id })
        if (!medicineToUpdate) {
            return res.status(404).json({
                mesaage: "medicine not found" 
            })
        }
        const medicineImage = await cloudinary.uploader.upload(req.body.MedicineImage, {
            public_id: 'medicineImage' + req.params.id,
            width: 650,
            height: 500,
            crop: 'fill',
            folder: 'Medicnes'
        });

        medicineToUpdate.MedicineName = req.body.MedicineName,
        medicineToUpdate.MedicineImage = medicineImage.secure_url;
        medicineToUpdate.MedicineID = req.params.id,
        medicineToUpdate.MedicineDetails = req.body.MedicineDetails,
        medicineToUpdate.Price = req.body.Price;
        medicineToUpdate.Category = req.body.Category

        const dataRes = await medicineToUpdate.save();
            return res.status(200).json({ 
                message: "medicine updated succesfully" 
            })
    }
     catch(err) {
        return res.status(500).json({
            error: err.message
        })
    }
    

});

router.delete('/:id', async (req, res, next) => {   // to delete the medicine
    await Medicine.deleteOne({ "MedicineID": req.params.id }).then(result => {
        return res.send("Medicine deleted successfully ");
    })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.get('/:id', async (req, res, next) => {   //getbyID
    try {
        const result = await Medicine.find({ "MedicineID": req.params.id });
        res.send(result);
    }
    catch {
        res.send('Error' + err);
    }
});


module.exports = router;