const express = require('express');
const router = express.Router();
let User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")







router.post('/login', async(req, res) => {
        let loginData = await User.findOne({ email: req.body.email });
        if (loginData) {
            let validPass = await bcrypt.compare(req.body.passWord, loginData.passWord);
            if (validPass) {
                console.log("loginnnnnnn");
                let data = JSON.stringify(loginData.email)
                let token = jwt.sign(data, 'EFBWUYFBUWBFUWVYFBUWEF')
                res.send({
                    token,
                    loginData
                })
            } else {
                res.send("Failed");
            }

        } else {
            return res.send("User not found Please Create  new Account");

        }



    }

);
module.exports = router;