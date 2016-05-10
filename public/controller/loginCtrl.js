/**
 * Created by LucyQiao on 5/6/16.
 */
app.controller('loginCtrl',function($scope,$http,$localStorage,$location){
    $scope.email='';
    $scope.password='';

    $scope.login = function() {
        var data = {
            email: $scope.email,
            password: $scope.password
        };
        console.log('login click', data);
        $http.post('/koc/login', data).then(function(res) {

            if(res.data.success) {
                $localStorage.token = res.data.token;
                //$location.path("/dashboard/:user_id");

            }
            console.log('local storage: ',$localStorage);

        });
    };

    $scope.cancel=function(){
        $location.path("/");
    };


    //$scope.test = function() {

      //  console.log('click test: ')
        //$http.post('/koc/test', {token: $localStorage.token}).then(function(res) {
          // console.log('test res', res);
        //});
    //}
});