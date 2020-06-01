const express = require("express")
const bodyParser = require("body-parser");

//database

let database = [];
let id = 100;

// initialization 

let app = express();
let port = process.env.PORT || 3001

app.use(bodyParser.json());

/*
Data structure

let contact = {
		firstname:String,
		lastname:String,
		nickname:String,
		title:String,
		phone:Array,
		mobile:Array,
		email:Array,
		street:String,
		postcode:String,
		city:String,
		country:String,
		id:DatabaseID
}
*/

//REST API

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contact",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
		return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length ===0) {
		return res.status(422).json({message:"provide required data"})
	}
	let contact = {
		id:id++,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		title:req.body.title,
		nickname:req.body.nickname,
		phone:req.body.phone,
		mobile:req.body.mobile,
		email:req.body.email,
		street:req.body.street,
		postcode:req.body.postcode,
		city:req.body.city,
		country:req.body.country
	}
	database.push(contact);
	console.log(database);
	return res.status(200).json({message:"success"})
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.put("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
		return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length ===0) {
		return res.status(422).json({message:"provide required data"})
	}	
	let contact = {
		id:tempId,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		title:req.body.title,
		nickname:req.body.nickname,
		phone:req.body.phone,
		mobile:req.body.mobile,
		email:req.body.email,
		street:req.body.street,
		postcode:req.body.postcode,
		city:req.body.city,
		country:req.body.country
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,contact);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.listen(port);

console.log("Running in port:"+port);