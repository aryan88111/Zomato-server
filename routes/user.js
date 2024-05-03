const express = require('express');
const router = express.Router();
let User = require('../model/user');
const bcrypt = require('bcrypt');
router.post('/signup', async(req, res) => {
    let data = await User.findOne({ email: req.body.email });
    if (data) {
        return res.send("User Already Present in DataBase");
    } else {
        let newPassWord = await bcrypt.hashSync(req.body.passWord, 10);
        console.log(newPassWord);
        let userData = new User({
            name: req.body.name,
            email: req.body.email,
            passWord: newPassWord
        })
        await userData.save()
        res.send({ userData, msg: "Account Created.." })
    }

});
module.exports = router;