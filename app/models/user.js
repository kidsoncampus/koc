var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var bcrypt =require('bcrypt-nodejs');

var UserSchema = new Schema({
	email: {type:String,unique:true},
	password: {type:String,select:false},
	fName:String,
	lName:String,
	phone:Number,
	address:String
});

//hash the password before the user is saved
UserSchema.pre('save',function(next){
	var user=this;
	//hash the password only if the password has been changed  or user is new
	if(!user.isModified('password')) return next();

	//generate the hash
	bcrypt.hash(user.password,null,null,function(err,hash){
		//change the password to the hashed version
		user.password=hash;
		next();
	});
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword=function(password){
	var user=this;
	return bcrypt.compareSync(password,user.password);
};

// create a model using it
var User = mongoose.model('User', UserSchema);
// make this available to our users in our Node applications
module.exports = User;