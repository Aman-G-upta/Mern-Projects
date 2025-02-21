const mongoose = require('mongoose')


let userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    
})


module.exports = mongoose.model("user", userSchema);