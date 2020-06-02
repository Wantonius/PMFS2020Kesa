const express = require("express")
const bodyParser = require("body-parser");
const contactrouter = require("./routes/contactrouter");

// initialization 

let app = express();
let port = process.env.PORT || 3001

app.use(bodyParser.json());

//user management

const registeredUsers = [];
const loggedSessions = [];
const ttl_diff = 1000*60*60;

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
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			let now = new Date().getTime();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"})
			}
			loggedSessions[i].ttl = now+ttl_diff;
			req.session = {};
			req.session.username = loggedSessions[i].username;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
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
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"})
		}
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	return res.status(200).json({message:"success"});
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
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			if(req.body.password === registeredUsers[i].password) {
				let token = createToken();
				let ttl = new Date().getTime()+ttl_diff;
				let session = {
					username:req.body.username,
					ttl:ttl,
					token:token
				}
				loggedSessions.push(session);
				console.log(loggedSessions);
				return res.status(200).json({token:token})
			}
		}
	}
	return res.status(403).json({message:"login failed"});
})

app.use("/api",isUserLogged,contactrouter);

app.listen(port);

console.log("Running in port:"+port);