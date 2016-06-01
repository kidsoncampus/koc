/**
 * Created by LucyQiao on 5/25/16.
 */
app.controller('parentDashCtrl',function($scope,$location,Auth){

    if (Auth.isLoggedIn()) {
        Auth.getUser()
            .then(function(data) {
                $scope.username = data.data.fName + " " + data.data.lName;
            });
    } else {
        $location.path("/login");
    };

});