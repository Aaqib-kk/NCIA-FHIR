const express = require("express");
const router = express.Router();
// const userController = require("../controller/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const env = require('var');

const User = require("../models/user");


// router.post("/signup", userController.createUser);
router.post("/signup", (req, res, next) => {
   if (!req.body.email || !req.body.password) {
       return res.status(400).json({
           message: "Please Enter email and Password"
       })
   }
   bcrypt.hash(req.body.password, 10).then(hash => {
       const user = new User({
           email: req.body.email,
           password: req.body.password
           
         });
         
       user
           .save()
           
           .then(result => {
            console.log(result);
               res.status(201).json({
                   message: "User created!",
                   result: result
                   

               });
           })
           .catch(err => {
              console.log(err);
               res.status(500).json({
                   message: "Invalid Credentials!"
               });
           });
   });
});
router.get('/check',(req,res)=>{
   res.send("Hellow world")
})
// router.post("/login", userController.loginUser );

module.exports = router;
