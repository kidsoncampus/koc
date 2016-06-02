/**
 * Created by LucyQiao on 5/3/16.
 */
app.controller('signCtrl',function($scope,getUserService,$location){
    $scope.email='';
    $scope.password='';
    $scope.fName='';
    $scope.lName='';
    $scope.phone='';
    $scope.address='';

    $scope.saveUser=function(){
      var userData={'email':$scope.email,
                    'password':$scope.password,
                    'fName': $scope.fName,
                    'lName':$scope.lName,
                    'phone':$scope.phone,
                    'address':$scope.address
      };
        getUserService.newUser(userData).then(function(){
            $location.path("/login");
        });
    };

    $scope.cancel=function(){
        $location.path("/");
    };
});