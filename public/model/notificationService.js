/* 
 * Created by Shuangyi Li on 6/1/16
 */
 app.service('notificationService', function($http){
 	var newNotification = function (notificationData){
 		return $http.post('/notificationAdmin', notificationData)
 			.then(function sucessCallback(res){
 				alert('Send notification successfully!');
 			});
 	};
 	return {
 		"newNotification": newNotification
 	}
 });