const mongoose=require('mongoose');

let ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    
    orders:{
        type:Array,
        default:[]
    },
    picture:{
        type:String,
        default:"default.jpg"
    },
    gstin:String
 
})

module.exports = mongoose.model("owner",ownerSchema);