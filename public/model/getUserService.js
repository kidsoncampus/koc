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
        },
        getUserInfo=function(id) {
            return $http.get("/user/" + id);
        },
        editUserInfo=function(id,userData){
            return $http.put("/user/"+id,userData);
        };

    return {
        "newUser": newUser,
        "getUserInfo": getUserInfo,
        "editUserInfo":editUserInfo

    }
});