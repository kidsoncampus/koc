/**
 * Created by Shuangyi Li on 6/1/16
 */

 var Notification = require('mongoose').model('Notification');

 //notification post

 exports.create = function(req,res,next){
 	var notification = new Notification(req.body);
  		notification.subject = req.body.subject;
 		notification.message = req.body.message;
 		notification.from = req.body.from;
 		notification.time = req.body.time;
 		console.log(req.body);
 		
 		notification.save(function(err){
 			if(err){
 				//res.json({message:'fail to send notification'});
 				return next(err);
 			}else{
 				//res.json({message: 'send notification successfully'});
 				res.json(notification);
 			}
 		});
 };

 //get notification messages
 exports.notificationList = function(req, res, next){
 	Notification.find({}, function(err, notifications){
 		if(err){
 			return next(err);
 		}else{
 			res.json(notifications);
 		}
 	});
 };