const express = require('express');
const router = express.Router();
const User = require('../models/User')
const secretCrypto = process.env.SECRET_CRYPTO;
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Registeration
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, secretCrypto).toString()
    });
    try{
        const savedUser = await newUser.save();
        console.log(savedUser)
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
    }
})

//  Login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Incorrect credentials.");

        const passwordOriginal = CryptoJS.AES.decrypt(user.password, secretCrypto).toString(CryptoJS.enc.Utf8);

        passwordOriginal !== req.body.password && res.status(401).json("Incorrect credentials.");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_JWT, {expiresIn: "3d"})

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;