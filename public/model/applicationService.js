/**
 * Created by LucyQiao on 5/27/16.
 */
app.service('applicationService',function($http){
    var newApplication=function(applicationData){
        return $http.post('/waitinglist',applicationData)
            .then(function successCallback(res){

                alert('Your application is submitted!');

            });
    },
        getEmergencyInfo=function(id){
            return $http.get('/waitinglist/'+id);
        },
        editEmergencyInfo=function(id,applicationData){
            return $http.put("/waitinglist/"+id,applicationData);
        };

    return {
        "newApplication": newApplication,
        "getEmergencyInfo":getEmergencyInfo,
        "editEmergencyInfo": editEmergencyInfo
    }
});