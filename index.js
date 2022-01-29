const express = require('express')
const authRoute = require('./routes/auth-route')
const profileRoute = require('./routes/profile-route')
const passportSetup = require('./config/passport-setup')
const app = express();
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport')


app.set("view engine","ejs")

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['asd']
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
	res.render("home",{user:req.user})
})
mongoose.connect('mongodb+srv://admin:admin123@cluster0.pyqoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
			.then(()=>console.log("Connectd To Db"))
			.catch((err)=>console.log(err))
app.use("/auth",authRoute);
app.use("/profile",profileRoute);

app.listen(3000,()=>{
	console.log("server is running on port 3000")
})