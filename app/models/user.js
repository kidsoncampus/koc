var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type:String,unique:true},
	password: String,
	fName:String,
	lName:String,
	phone:Number,
	address:String
});

// create a model using it
var User = mongoose.model('User', UserSchema);
// make this available to our users in our Node applications
module.exports = User;