const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout ,profile } = require('../controllers/authController');
const isLoggedIn = require('../middlewares/isloggedIn');



router.get("/", function (req, res) {
    res.send("Users");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",isLoggedIn, logout);
// router.get("/profile",isLoggedIn, profile);

module.exports = router;