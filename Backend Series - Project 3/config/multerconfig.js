const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

//what we have to perform  

// 1. Setup disk storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function (err, name) {
            const fn = name.toString("hex") + path.extname(file.originalname);
            cb(null, fn)

        })
    }
})

const upload = multer({ storage: storage })
// 2. Export upload variable

module.exports= upload;