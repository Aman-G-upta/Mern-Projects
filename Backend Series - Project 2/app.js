const express = require('express')
const app = express()
const path =require('path')
const userModel = require('./models/user')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get("/",function(req,res){
    res.render("index")
})

app.get("/read",async function(req,res){
    let users = await userModel.find()//yala name niche likha hai hamlog nai 
    res.render("read",{users})
})

app.get("/delete/:id",async function(req,res){
    let deleteusers = await userModel.findOneAndDelete({_id:req.params.id})//yala name niche likha hai hamlog nai 
    res.redirect("/read")
})

app.get("/edit/:userid",async function(req,res){
    let user = await userModel.findOne({_id:req.params.userid})
    res.render("edit",{user})
    
})


app.post("/create",async function(req,res){
    let {name,email,image}=req.body;//both name in form and here should be same
    let createduser = await userModel.create({
        // username:req.body.Name;
        name, //it is equal to name beacause if there is name on both the side it is equal to one time name  
        email,
        image
    })
    res.redirect("/read")
})

app.post("/update/:userid",async function(req,res){
    let {name,email,image}=req.body;//both name in form and here should be same
    let updateduser = await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true})
    res.redirect("/read")
})

app.listen(3000)