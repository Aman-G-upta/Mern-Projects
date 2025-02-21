const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash')

const db = require('./config/mongoose-connection');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');
const indexRouter = require('./routes/index');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/",indexRouter);
app.use("/owners",ownerRouter);
app.use("/users",usersRouter);
app.use("/product",productRouter);

// app.get("/", (req, res) => {
//     res.send("fine")

// })

app.listen(3000)