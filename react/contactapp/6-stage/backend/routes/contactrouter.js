const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("../models/contact");

let router = express.Router();

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
	let query = {"owner":req.session.username};
	if(req.query.lastname) {
		query = {
			"owner":req.session.username,
			"lastname":req.query.lastname
		}
	}
	contactModel.find(query,function(err,contacts) {
		if(err) {
			console.log("Find contacts failed. Reason:",err);
			return res.status(404).json({message:"not found"})
		}
		if(!contacts) {
			return res.status(200).json([])
		}
		return res.status(200).json(contacts);
	})
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
	let contact = new contactModel({
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
	})
	contact.save(function(err,contact) {
		if(err) {
			console.log("Failed to save contact, Reason:",err)
			return res.status(409).json({message:"not saved"})
		}
		if(!contact) {
			return res.status(409).json({message:"not saved"})
		}
		return res.status(200).json({message:"success"})
	})

})

router.delete("/contact/:id",function(req,res) {
	let tempId = req.params.id;
	contactModel.findById(tempId, function(err,contact) {
		if(err) {
			console.log("Failed in finding contact to delete. Reason",err);
			return res.status(404).json({message:"not found"})
		}
		if(!contact) {
			return res.status(404).json({message:"not found"})
		}
		if(contact.owner === req.session.username) {
			contactModel.deleteOne({"_id":contact._id}, function(err) {
				if(err) {
					console.log("Failed to delete contact. Reason",err);
					return res.status(409).json({message:"conflict"})
				}
				return res.status(200).json({message:"success"})
			})
		} else {
			return res.status(409).json({message:"conflict"})
		}
	})
})

router.put("/contact/:id",function(req,res) {
	let tempId = req.params.id;
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
		return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length ===0) {
		return res.status(422).json({message:"provide required data"})
	}	
	let tempContact = {
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
	contactModel.findById(tempId,function(err,contact) {
		if(err) {
			console.log("Failed in finding contact to update. Reason",err);
			return res.status(404).json({message:"not found"})
		}
		if(!contact) {
			return res.status(404).json({message:"not found"})
		}
		if(contact.owner === req.session.username) {
			contactModel.replaceOne({"_id":req.params.id},tempContact,function(err) {
				if(err) {
					console.log("Failed to update contact. Reason",err);
					return res.status(409).json({message:"conflict"})
				}
				return res.status(200).json({message:"success"})				
			})
		} else {
			return res.status(409).json({message:"conflict"})	
		}		
	})
	
})

module.exports = router;