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
    }
    $scope.getSortClass=function(column){
        if($scope.sortColumn==column){
            return $scope.reverseSort ? 'arrow-down':'arrow-up';
        }
        return '';
    }



    $scope.removePerson = function(index){
        $scope.wl.splice(index, 1);
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
        {priority:"faculty",type:"Full-time",submittedDate:"08/09/2015",dateOfEnroll:"08/09/2016",pname:"aaaa",class:"Dolphin & Shark",kfname:"AA",klname:"AA",age:1,sex:"female"},
        {priority:"graduate student",type:"Part-time","submittedDate":"05/05/2015","dateOfEnroll":"05/23/2016","class":"Dolphin & Shark","kname":"B","age":1,"sex":"female"},
        {priority:"undergraduate student","type":"Full-time",submittedDate:"08/15/2015",dateOfEnroll:"08/15/2016","class":"Sea Turtle","kname":"CC",age:2,sex:"male"},
        {priority:"alumni","type":"Class of 2009",submittedDate:"10/17/2015",dateOfEnroll:"08/23/2016","class":"Sea Turtle",kname:"D",age:3,sex:"male"},
        {priority:"alumni","type":"Class of 2010",submittedDate:"12/15/2015",dateOfEnroll:"12/30/2016","class":"Starfish & Sea Otter",kname:"EE",age:2,sex:"female"},
        {priority:"staff","type":"Full-time",submittedDate:"11/03/2015",dateOfEnroll:"09/15/2016","class":"Sea Turtle",kname:"A",age:1,sex:"female"},
        {priority:"faculty","type":"Full-time","submittedDate":"08/09/2015","dateOfEnroll":"08/09/2016","class":"Dolphin & Shark","kname":"A","age":1,"sex":"female"},
        {priority:"graduate student","type":"Part-time","submittedDate":"05/05/2015","dateOfEnroll":"05/23/2016","class":"Dolphin & Shark","kname":"BB","age":1,"sex":"female"},
        {priority:"undergraduate student","type":"Full-time",submittedDate:"08/15/2015",dateOfEnroll:"08/15/2016","class":"Sea Turtle","kname":"C",age:2,sex:"male"},
        {priority:"alumni","type":"Class of 2009",submittedDate:"10/17/2015",dateOfEnroll:"08/23/2016","class":"Sea Turtle",kname:"DD",age:3,sex:"male"},
        {priority:"alumni","type":"Class of 2010",submittedDate:"12/15/2015",dateOfEnroll:"12/30/2016","class":"Starfish & Sea Otter",kname:"E",age:2,sex:"female"},
        {priority:"staff","type":"Full-time",submittedDate:"11/03/2015",dateOfEnroll:"09/15/2016","class":"Sea Turtle",kname:"AB",age:1,sex:"female"}

    ];

    // todos.controller('TodoController', function($scope) {
    //$scope.filteredTodos = []
    //    ,$scope.currentPage = 1
    //    ,$scope.numPerPage = 10
    //    ,$scope.maxSize = 5;
    //
    //$scope.makeTodos = function() {
    //    $scope.todos = [];
    //    for (i=1;i<=1000;i++) {
    //        $scope.todos.push({ text:$scope.wl, done:false});
    //    }
    //};
    //$scope.makeTodos();
    //
    //$scope.numPages = function () {
    //    return Math.ceil($scope.todos.length / $scope.numPerPage);
    //};
    //
    //$scope.$watch('currentPage + numPerPage', function() {
    //    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    //        , end = begin + $scope.numPerPage;
    //
    //    $scope.filteredTodos = $scope.todos.slice(begin, end);
    //});

});


