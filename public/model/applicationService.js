/**
 * Created by LucyQiao on 5/27/16.
 */
app.service('applicationService',function($http){
    var newApplication=function(applicationData){
        return $http.post('/waitinglist',applicationData)
            .then(function successCallback(res){

                alert('Your application is submitted!');

            });
    };

    return {
        "newApplication": newApplication
    }
});