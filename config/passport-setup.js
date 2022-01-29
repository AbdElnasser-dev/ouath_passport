const passport = require("passport")

const GoogleStrategy = require('passport-google-oauth20')

const User = require("../Models/User")



passport.serializeUser((user,done)=>{
	done(null,user.id)
})

passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
		done(null,user)
	})
})



passport.use(new 
	GoogleStrategy({
		callbackURL:'/auth/google/redirect',
		clientID:'1025957918528-4a6kmllmqe0fcnfggcnvp96aq86tcb8q.apps.googleusercontent.com',
		clientSecret:'gy85fJ9lNYA4XgC5iFEtiI0s',
},
	(accessToken,refreshToken,profile,done)=>{
		//check if the user is not exists
		User.findOne({googleId:profile.id}).then((currentUser)=>{
			//the user is exists
			if(currentUser){
				console.log("The User Is exists before...")
				done(null,currentUser)
			}else{
			//the user is not exists and create It
			new User({	
			username:profile.displayName,
			googleId:profile.id
			}).save()
			.then((newUser)=>{
				console.log("New User Is Created"+newUser)
				done(null,newUser)

			})

			}
		})
		
})
)