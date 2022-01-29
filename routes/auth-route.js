const router = require('express').Router()
const passport = require('passport');

//auth login
router.get("/login",(req,res)=>{
	res.render("login",{user:req.user})
})

//auth logout with google
router.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/");
})
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
	res.redirect("/profile/")
})
//auth login with google
router.get("/google",passport.authenticate('google',{
	scope:['profile']
}))

module.exports = router