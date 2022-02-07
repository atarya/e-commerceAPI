const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorisation } = require("./verifyToken");

/* router.post('/test', (req, res) => {
    const username = req.body.username;
    console.log("req" + req, "res" + res, username)
}).get('/test', (req, res) =>{
    console.log(req, "Reached root")
    res.send("Test Passed @ /test")
})*/

// Update
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_JWT
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
