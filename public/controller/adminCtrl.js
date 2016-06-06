app.controller('adminCtrl',function($scope,$http,$location,Auth){
    var ad = this;

    //get info if a persion is logged in
    ad.loggedIn = Auth.isLoggedIn();

    if (ad.loggedIn) {
        Auth.getUser()
            .then(function(data) {
                $scope.userType = data.data.userType;
            });
    };

    $scope.sortColumn="priority";
    $scope.reverseSort=false;

    $scope.sortData=function(column){
        $scope.reverseSort=($scope.sortColumn==column)? !$scope.reverseSort:false;
        $scope.sortColumn=column;
    };
    $scope.getSortClass=function(column){
        if($scope.sortColumn==column){
            return $scope.reverseSort ? 'arrow-down':'arrow-up';
        }
        return '';
    };



    //$scope.removePerson = function(id){
    //    console.log("list", $scope.wl);
    //    var toDelPos = -1;
    //    for (var i = 0; i < $scope.wl.length; i++) {
    //        if ($scope.wl[i]._id == id) {
    //            toDelPos = i;
    //            break;
    //        }
    //    }
    //    console.info("delPos", toDelPos);
    //    var item = $scope.wl.splice(toDelPos, 1);
    //    console.info("del", item);
    //};


    $scope.classList = ["Dolphin & Shark", "Starfish & Sea Otter","Sea Turtle"];


    $scope.wls = [];

    var fetchAllApplications=function(){
        return $http.get('/adminDashboard').then(
            function(response){
                $scope.wls = response.data;
            },function(errResponse){
                console.error('Error while fetching notes');
            });
    };

    fetchAllApplications();



});


