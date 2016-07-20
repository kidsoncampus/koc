/**
 * Created by LucyQiao on 7/19/16.
 */
app.controller('editProfileCtrl',function($scope,getUserService,$routeParams,$location) {
    var userID=$routeParams.userId;

    $scope.fName='';
    $scope.lName='';
    $scope.phone='';
    $scope.address='';

    getUserService.getUserInfo(userID)
        .then(function(res){
            $scope.fName=res.data.fName;
            $scope.lName=res.data.lName;
            $scope.phone=res.data.phone;
            $scope.address=res.data.address
        });

    $scope.saveUser=function(){
        var userInfo={
            'fName':$scope.fName,
            'lName':$scope.lName,
            'phone':$scope.phone,
            'address':$scope.address,
            'email':$scope.email
        };

        getUserService.editUserInfo(userID,userInfo).then(function(){
            $location.path("/parentDashboard");
        });
    };

    $scope.cancel=function(){
        $location.path("/parentDashboard");
    };



});