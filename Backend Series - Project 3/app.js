const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require('path');
const upload = require('./config/multerconfig');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname ,"public")));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.render("index");

});
app.get('/profile/upload', function (req, res) {
    res.render("profileupload");

});
app.post('/upload', isLoggedIn ,upload.single("image") ,async function (req, res) {
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename;
    await user.save();

    res.redirect("/profile");

});

app.get('/login', function (req, res) {
    res.render("login");

});


app.get('/logout', function (req, res) {
    res.cookie("token", "");
    res.render("login");

});

app.get('/profile', isLoggedIn, async function (req, res) {

    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    // console.log(user); // Check if posts are populated
    res.render("profile", { user });

});

app.get('/like/:id', isLoggedIn, async function (req, res) {
    try {
        const post = await postModel.findOne({ _id: req.params.id });

        let liked;
        if (post.likes.indexOf(req.user.userid) === -1) {
            post.likes.push(req.user.userid);
            liked = true;
        } else {
            post.likes.splice(post.likes.indexOf(req.user.userid), 1);
            liked = false;
        }

        await post.save();

        res.status(200).json({
            success: true,
            likes: post.likes.length,
            liked
        }); // Send JSON response
    } catch (error) {
        console.error("Error liking the post:", error);
        res.status(500).json({ success: false, message: "Error liking the post" });
    }
});

app.get('/edit/:id', isLoggedIn, async function (req, res) {

    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    res.render("edit", { post })

});

app.post('/update/:id', isLoggedIn, async function (req, res) {

    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });

    res.redirect("/profile");

});
app.post('/delete/:id', isLoggedIn, async function (req, res) {
    try {
        const post = await postModel.findOneAndDelete({ _id: req.params.id });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        res.redirect("/profile");
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
});



app.post('/post', isLoggedIn, async function (req, res) {

    let user = await userModel.findOne({ email: req.user.email });

    let { content } = req.body;
    // Create a new post and wait for it to be saved
    let post = await postModel.create({
        user: user._id,
        content,
    });

    // Push the post ID to the user's posts array
    user.posts.push(post._id);
    await user.save(); // Save the updated user

    res.redirect("/profile");

});

app.post('/register', async function (req, res) {
    let { name, username, age, email, password } = req.body;
    // userModel.findOne({email:email})
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User is already registered");
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                username,//username:username both are equal
                age,
                email,
                password: hash
            })
            let token = jwt.sign({ email, userid: user._id }, "shhhh");
            res.cookie("token", token)
            res.redirect("/profile")
        });
    });

});

app.post('/login', async function (req, res) {
    let { email, password } = req.body;
    // userModel.findOne({email:email})
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went wrong");
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, "shhhh");
            res.cookie("token", token)
            res.status(200).redirect("profile")
        }
        else res.redirect("/login")
    })


});


function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    }
}




const PORT = process.env.PORT || 3000;
app.listen(3000);