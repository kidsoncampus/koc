/**
 * Created by LucyQiao on 7/18/16.
 */
app.controller('editECtrl',function($scope,applicationService,$routeParams,$location) {
    var appliID=$routeParams.appliID;

    $scope.eFname='';
    $scope.eLname='';
    $scope.ePhone='';
    $scope.eAddress='';
    $scope.eEmail='';

    applicationService.getEmergencyInfo(appliID)
        .then(function(res){
            $scope.eFname=res.data.eFname;
            $scope.eLname=res.data.eLname;
            $scope.ePhone=res.data.ePhone;
            $scope.eAddress=res.data.eAddress;
            $scope.eEmail=res.data.eEmail
        });

    $scope.saveInfo=function(){
        var emergencyInfo={
            'eEmail':$scope.eEmail,
            'eLname':$scope.eLname,
            'ePhone':$scope.ePhone,
            'eAddress':$scope.eAddress,
            'eEmail':$scope.eEmail
        };

        applicationService.editEmergencyInfo(appliID,emergencyInfo).then(function(){
            $location.path("/emergencyContact");
        });
    };

    $scope.cancel=function(){
        $location.path("/emergencyContact");
    };



});