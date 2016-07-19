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



    $scope.classList = ["Dolphin & Shark", "Starfish & Sea Otter","Sea Turtle"];


    $scope.wls = [];

    $scope.calculateAge = function(birthday) { // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    var fetchAllApplications=function(){
        return $http.get('/adminDashboard').then(
            function(response){
                    $scope.wls = response.data;
            },function(errResponse){
                console.error('Error while fetching notes');
            });
    };

    fetchAllApplications();


    $scope.approve=function(id){
        var updatedData={'status':"Approved"};
        alert("The Application status is changed to Approved");

        $http.put('/waitinglist/' +id,updatedData)
            .then(fetchAllApplications);

    };


    $scope.deleteApplication=function(id){
        return $http.delete('/waitinglist/' +id).then(
            function(response){
                $scope.wls = response.data;
                location.reload();
            },function(errResponse){
                console.error('Error while deleting applications');
            });
    };

});


