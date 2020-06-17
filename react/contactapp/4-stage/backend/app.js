const express = require("express")
const bodyParser = require("body-parser");
const contactrouter = require("./routes/contactrouter");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const path = require("path");
// initialization 

let app = express();
let port = process.env.PORT || 3001

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://test:test@cluster0-ujjvo.mongodb.net/pmkesacontact?retryWrites=true&w=majority").then(
	() => console.log("Connection to mongoDB successful"),
	(err) => console.log("Failed to connect to MongoDB. Reason",err)
);

app.use(express.static(__dirname+"/build"));

//user management

const ttl_diff = 1000*60*60

/*
	Session data
	username:String,
	ttl:Number,
	token:String
*/

//HELPERS

createToken = () => {
	const letters = "ABCDEFGHIJKLMNOPabcdefghijklmnop0123456789"
	let token = ""
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*letters.length)
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason:",err);
			return res.status(403).json({message:"forbidden"})
		}
		if(!session) {
			console.log("Session is null")
			return res.status(403).json({message:"forbidden"})
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id},function(err) {
				if(err) {
					console.log("Failed to remove session. Reason:",err);
				}
				return res.status(403).json({message:"forbidden"})
			})
		} else {
			req.session = {}
			req.session.username = session.username
			session.ttl = now+ttl_diff
			session.save(function(err) {
				if(err) {
					console.log("Failed to save session:",err);
				}
				return next();
			})
		}
	})
	
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length <8) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	bcrypt.hash(req.body.password,16,function(err,hash) {
		if(err) {
			console.log("Failed to hash password, Reason:",err);
			return res.status(422).json({message:"Please provide proper credentials"})
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Register failed. Reason:",err);
				return res.status(409).json({message:"username is already in use"})
			} else {
				console.log("User registered. Username:",user.username)
				return res.status(200).json({message:"success"});
			}
		})
	});
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length <8) {
		return res.status(422).json({message:"Please provide proper credentials"})
	}
	userModel.findOne({"username":req.body.username}, function(err,user) {
		if(err) {
			console.log("Failed to find user. Reason:",err);
			return res.status(422).json({message:"Please provide proper credentials"})
		}
		if(!user) {
			console.log("User is null");
			return res.status(422).json({message:"Please provide proper credentials"})	
		}
		bcrypt.compare(req.body.password,user.password, function(err,success) {
			if(err) {
				return res.status(422).json({message:"Please provide proper credentials"})					
			}
			if(!success) {
				return res.status(403).json({message:"login failed"});					
			}
			let token = createToken();
			let ttl = new Date().getTime()+ttl_diff;
			let session = new sessionModel({
				username:req.body.username,
				ttl:ttl,
				token:token
			})
			session.save(function(err,session){
				if(err) {
					console.log("Session creation failed. Reason:",err)
					return res.status(403).json({message:"login failed"});
				}				
				return res.status(200).json({token:token})
			})
		})
	})
		
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"})
	}
	sessionModel.deleteOne({"token":token},function(err,session) {
		if(err) {
			console.log("Failed to delete session. Reason:",err);
			return res.status(409).json({message:"conflict"})
		}
		if(!session) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"})
	})
})

app.use("/api",isUserLogged,contactrouter);

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(port);

console.log("Running in port:"+port);