/**
 * Created by Lucy Qiao on 5/26/16.
 */


app.controller('wListController', function($scope,applicationService,$location,Auth){

    //get login user info
    if (Auth.isLoggedIn()) {
        Auth.getUser()
            .then(function(data) {
                $scope.email = data.data.email;
                $scope.fName=data.data.fName;
            });
    } else {
        $location.path("/login");
    };

    $scope.dt='';
    $scope.chFname='';
    $scope.chLname='';
    $scope.chGender='';
    $scope.b_dt='';
    $scope.program='';
    $scope.eFname='';
    $scope.eLname='';
    $scope.ePhone='';
    $scope.eEmail='';
    $scope.eAddress='';
    $scope.p_dt='';
    $scope.priorityLevel1='';
    $scope.priorityLevel2='';



    //$scope.myRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;


    $scope.applicationList = [

        { applicationId: 1, Name: 'Dolphin & Shark (children 3 to 5 years of age)'},
        { applicationId: 2, Name: 'Starfish & Sea Otter (children 6 weeks to 30 months of age)' },
        { applicationId: 3, Name: 'Sea Turtle (children 2 to 3 years of age)' }
    ];


    $scope.level1List = ["Faculty/Staff","Student","Alumni"];


    //$scope.level2List = [];



    // import datepicker
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.open3 = function() {
        $scope.popup3.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.popup3 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };



    $scope.submitForm = function () {
        var applicationData={'email':$scope.email,
                             'submitDate':$scope.dt,
                             'chFname':$scope.chFname,
                             'chLname':$scope.chLname,
                             'chGender':$scope.chGender,
                             'chBirthday':$scope.b_dt,
                             'program':$scope.program,
                             'eFname':$scope.eFname,
                             'eLname':$scope.eLname,
                             'ePhone':$scope.ePhone,
                             'eEmail':$scope.eEmail,
                             'eAddress':$scope.eAddress,
                             'perferredStartDate':$scope.p_dt,
                             'priorityLevel1':$scope.priorityLevel1



        };
        applicationService.newApplication(applicationData).then(function(){
            $location.path("/parentDashboard");
        });


    };

});
