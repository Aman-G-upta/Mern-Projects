const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const ownerModel = require('../models/owner-model');
const isLoggedIn = require('../middlewares/isloggedIn');

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503).send("You don't have permission to create owner.");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,


        });

        res.status(201).send(createdOwner);
    });
}

router.get("/admin",isLoggedIn, function (req, res) {
    let success = req.flash("success")
    res.render("createproducts",{success});
});

router.get("/profile", isLoggedIn, async function (req, res) {

    res.render("profile");
});
router.get("/upload", isLoggedIn, async function (req, res) {

    res.render("upload");
});
router.post("/profile", isLoggedIn, async function (req, res) {
     try {
            let { image } = req.body;
            let product = await productModel.create({
                image: req.file.buffer,
              
    
            });
            // req.flash("success","Product created successfully");
            res.redirect("/owners/profile");
        }catch(err){
            res.send(err.message);
        }
    
    res.render("profile");
});

module.exports = router;