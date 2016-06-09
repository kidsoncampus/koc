/*
 created by Shuangyi Li on 6/1/16.
*/

var mongoose = require('mongoose');
//create a schema
var Schema = mongoose.Schema;
var NotificationSchema = new Schema({
	subject : {
		type: String,
		required: true
	},
	message : {
		type: String,
		required: true
	},
	from : {
		type: String,
		required: true
	},
	time : {
		type: String,
		required: true
	}
});

//create a model
var Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;