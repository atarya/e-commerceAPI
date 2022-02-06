const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Registeration
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await newUser.save();
        console.log(savedUser)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;