const mongoose = require("mongoose");

let Schema = mongoose.Schema({
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
	owner:{type:String,indexed:true}
})

module.exports = mongoose.model("Contact",Schema);