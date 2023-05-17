const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
require('../database.js');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', async (req, res, next) => {  //to get all users
    try {
        const result = await User.find();
        res.send(result);
    }
    catch {
        res.send('Error' + err);
    }
});


router.post('/signup', async (req, res, next) => { 
    const {name,email,password} = req.body;  
    try {
      const existingUser = await User.findOne({email});
      if(existingUser)
      {
         return res.status(400).json({message:"User already Exist"});
      }
     
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = await User.create({name,email,password:hashedPassword});
      res.status(200).json({message:"signed in successful"})
    }
    catch (err) {
        return res.status(500).json({
            error: err
        })
    }
});


router.post('/login', async (req, res, next) => {   
    const {email,password} = req.body;  
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
        {
           return res.status(400).json({message:"User doesn't exist"});
        }
        const isPasswordMatched = await bcrypt.compare(password,existingUser.password)
       if(!isPasswordMatched)
       {
         return res.status(400).json({message:"Invalid Password"});
       } 
       const token = jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:'1h'});
       res.status(200).json({user:existingUser.name,message:"logged in",token:token,email:existingUser.email});
    }
    catch (err) {
        return res.status(500).json({
            error: err
        })
    }
});

module.exports = router;