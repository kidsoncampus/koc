/*
 * Created by Shuangyi Li on 6/1/16
 */

 app.controller('notificationCtrl', function($scope, $location, notificationService){
    $scope.subject = '';
    $scope.msg = '';
    $scope.nFrom = '';
    $scope.nTime = '';


    //send notification
    
     $scope.sendNotification = function (){
         var notificationData = {
             'subject': $scope.subject,
             'message': $scope.msg,
             'from' : $scope.nFrom,
             'time' : $scope.nTime
    	 };

    	 notificationService.newNotification(notificationData).then(function(){
	         $location.path('/notificationAdmin');
	     });
	 };
	 
 });