const express = require("express");

let router = express.Router();

//database

let database = [];
let id = 100;

/*
Data structure

let contact = {
		owner:String
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

router.get("/contact",function(req,res) {
	let tempList = [];
	for(let i=0;i<database.length;i++) {
		if(req.session.username === database[i].owner) {
			tempList.push(database[i]);
		}
	}
	return res.status(200).json(tempList);
})

router.post("/contact",function(req,res) {
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
		owner:req.session.username,
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

router.delete("/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(req.session.username === database[i].owner) {
				database.splice(i,1);
				return res.status(200).json({message:"success"})
			} else {
				return res.status(409).json({message:"conflict"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})

router.put("/contact/:id",function(req,res) {
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
		owner:req.session.username,
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
			if(req.session.username === database[i].owner) {
				database.splice(i,1,contact);
				return res.status(200).json({message:"success"})
			} else {
				return res.status(409).json({message:"conflict"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})

module.exports = router;