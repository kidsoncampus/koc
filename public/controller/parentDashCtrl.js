/**
 * Created by LucyQiao on 5/25/16.
 * Created fetchNotification by Shuangyi Li on 6/1/16.
 */
app.controller('parentDashCtrl',function($scope,$http,$location,Auth){
    $scope.applications=[];
    if (Auth.isLoggedIn()) {
        Auth.getUser()
            .then(function(data) {
                $scope.username = data.data.fName + " " + data.data.lName;
                $scope.email=data.data.email;
                fetchApplications();
            });
    } else {
        $location.path("/login");
    };



    var fetchApplications=function(){
        return $http.get('/users/' + $scope.email).then(
            function(response){
                $scope.applications = response.data;
            },function(errResponse){
                console.error('Error while fetching notes');
            });
    };

    //fetch notifications
   
    var fetchNotifications = function (){
        return $http.get('/getNotification').then(
            function(response){
                $scope.notifications = response.data;
                console.log(response.data);
            },
            function(err){
                console.error('Error while fetching notifications');
            });
    };
    fetchNotifications();



});