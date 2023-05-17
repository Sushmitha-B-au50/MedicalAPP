const bodyParser = require('body-parser');
 const medicineRoutes = require('./RestAPI/Routes/medicines');
 const userRoutes = require('./RestAPI/Routes/users');
 const orderRoutes = require('./RestAPI/Routes/orders');

const express =  require ('express');
var cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/medicines',medicineRoutes);
app.use('/users',userRoutes);
app.use('/orders',orderRoutes);

app.listen(8001, () => {
    console.log("Listening on the port 8001");
})