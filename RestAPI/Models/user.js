const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


//users collection
const userSchema  = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
    }
)

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;