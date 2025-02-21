// const mongoose = require('mongoose');
// require('dotenv').config(); 
// Load environment variables


// const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miniproject";

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Atlas Connected"))
// .catch(err => console.error("MongoDB Connection Error:", err));

// const userSchema = mongoose.Schema({
//     username: String,
//     name: String,
//     age: Number,
//     email: String,
//     password: String,
//     profilepic: {
//         type: String,
//         default: "default.jpg"
//     },
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
// });

// module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    profilepic:{
        type:String,
        default:"default.jpg"

    },
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"post"}]
})

module.exports = mongoose.model('user',userSchema)

