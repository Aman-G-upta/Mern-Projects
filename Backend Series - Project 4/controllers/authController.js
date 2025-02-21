const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async function (req, res) {

    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email })
        if (user) {
            req.flash("error", "You already have an account, please login. ");
            return res.redirect("/");
        }
        // let user = userModel.find
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                if (err)
                    return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    // let token = jwt.sign({ email, id: user._id }, "sceret");
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop")
                }

            })
        })

    } catch (err) {
        console.log(err.message)

    }

};

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (!user) {
        req.flash("error", "Email or password incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");

        }
        else {
            req.flash("error", "Email or password incorrect");
            return res.redirect("/");

        }
    })

};

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
}
// module.exports.profile = function (req, res) {
    
//     res.redirect("/users/profile");
// }