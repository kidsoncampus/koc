/**
 * Created by LucyQiao on 7/18/16.
 */
app.controller('emergencyCtrl',function($scope,$http,$routeParams,$location) {
    var appliID =$routeParams.appliID;
    $scope.contactInfo = [];
    var fetchAllEmergencyContact=function(){
        return $http.get('/emergencyContact').then(
            function(response){
                $scope.contactInfo = response.data;
            },function(errResponse){
                console.error('Error while fetching notes');
            });
    };

    fetchAllEmergencyContact();
    $scope.editE=function(id){
        $location.path("/edit/"+id);
    } ;

});