/**
 * Created by LucyQiao on 5/3/16.
 */
 app.service('getUserService',function($http){
    var newUser=function(userData){
        return $http.post('/koc/signup',userData)
            .then(function successCallback(res){
                //console.log(res);
                if (res.data.message=="fail"){ alert('Email address already existed!');}
                else{alert('User Created!');}

            });
    };

    return {
        "newUser": newUser
    }
});