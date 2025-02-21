const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Array,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,

})

module.exports= mongoose.model("product", productSchema)