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
                $scope.parentName=data.data.fName +' '+ data.data.lName;
                $scope.pPhone=data.data.phone;
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
    $scope.priorityLevel1= null;
    $scope.priorityLevel2= "";
    $scope.status='';


    
    $scope.applicationList = ['Dolphin & Shark','Starfish & Sea Otter','Sea Turtle'];

    var alumnis = [];
    var startYear = 1950;
    var prefixName = "Class Of ";

    for (var i = 0; i < 100; i++) {
        alumnis.push(prefixName + (startYear + i));
    }

    $scope.level1List = [
        {priority:"Faculty/Staff", types: ["Parent", "Grandparent"]},
        {priority:"Student", types: ["Full Time", "Part Time"]},
        {priority:"Alumni", types: alumnis}
    ];
   

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
                             'priorityLevel1':$scope.priorityLevel1.priority,
                             'priorityLevel2':$scope.priorityLevel2,
                             'parentName':$scope.parentName,
                             'pPhone':$scope.pPhone

        };
        applicationService.newApplication(applicationData).then(function(){
            $location.path("/parentDashboard");
        });


    };

});
