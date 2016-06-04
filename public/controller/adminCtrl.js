app.controller('adminCtrl',function($scope,$location,Auth){
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



    $scope.removePerson = function(id){
        console.log("list", $scope.wl);
        var toDelPos = -1;
        for (var i = 0; i < $scope.wl.length; i++) {
            if ($scope.wl[i]._id == id) {
                toDelPos = i;
                break;
            }
        }
        console.info("delPos", toDelPos);
        var item = $scope.wl.splice(toDelPos, 1);
        console.info("del", item);
    };


    $scope.classList = ["Dolphin & Shark", "Starfish & Sea Otter","Sea Turtle"];

    $scope.wl_priority="";
    $scope.wl_type="";
    $scope.wl_submittedDate="";
    $scope.wl_dateOfEnroll="";
    $scope.wl_class="";
    $scope.wl_kfname="";
    $scope.wl_klname="";
    $scope.wl_age="";
    $scope.wl_sex="";


    $scope.wl = [
        {_id: "0", priority:"faculty",type:"Full-time",submittedDate:"08/09/2015",dateOfEnroll:"08/09/2016",pname:"aaaa",class:"Dolphin & Shark",kfname:"AA",klname:"AA",age:1,sex:"female"},
        {_id: "1", priority:"graduate student",type:"Part-time","submittedDate":"05/05/2015","dateOfEnroll":"05/23/2016","class":"Dolphin & Shark","kname":"B","age":1,"sex":"female"},
        {_id: "2", priority:"undergraduate student","type":"Full-time",submittedDate:"08/15/2015",dateOfEnroll:"08/15/2016","class":"Sea Turtle","kname":"CC",age:2,sex:"male"},
        {_id: "3", priority:"alumni","type":"Class of 2009",submittedDate:"10/17/2015",dateOfEnroll:"08/23/2016","class":"Sea Turtle",kname:"D",age:3,sex:"male"},
        {_id: "4", priority:"alumni","type":"Class of 2010",submittedDate:"12/15/2015",dateOfEnroll:"12/30/2016","class":"Starfish & Sea Otter",kname:"EE",age:2,sex:"female"},
        {_id: "5", priority:"staff","type":"Full-time",submittedDate:"11/03/2015",dateOfEnroll:"09/15/2016","class":"Sea Turtle",kname:"A",age:1,sex:"female"},
        {_id: "6", priority:"faculty","type":"Full-time","submittedDate":"08/09/2015","dateOfEnroll":"08/09/2016","class":"Dolphin & Shark","kname":"A","age":1,"sex":"female"},
        {_id: "7", priority:"graduate student","type":"Part-time","submittedDate":"05/05/2015","dateOfEnroll":"05/23/2016","class":"Dolphin & Shark","kname":"BB","age":1,"sex":"female"},
        {_id: "8", priority:"undergraduate student","type":"Full-time",submittedDate:"08/15/2015",dateOfEnroll:"08/15/2016","class":"Sea Turtle","kname":"C",age:2,sex:"male"},
        {_id: "9", priority:"alumni","type":"Class of 2009",submittedDate:"10/17/2015",dateOfEnroll:"08/23/2016","class":"Sea Turtle",kname:"DD",age:3,sex:"male"},
        {_id: "10", priority:"alumni","type":"Class of 2010",submittedDate:"12/15/2015",dateOfEnroll:"12/30/2016","class":"Starfish & Sea Otter",kname:"E",age:2,sex:"female"},
        {_id: "11", priority:"staff","type":"Full-time",submittedDate:"11/03/2015",dateOfEnroll:"09/15/2016","class":"Sea Turtle",kname:"AB",age:1,sex:"female"}
    ];



});


