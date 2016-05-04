angular.module ('kocApp')

	.controller('MainController', ['$scope', function ($scope) {
	
	}])
	
	.controller ('LoginController', ['$scope', function($scope){
		$scope.userInput = {
			email : "",
			password : ""
		};
	}])


	.controller('wListController',['$scope',function($scope){
		$scope.myRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        $scope.applicationList = [
        
        { applicationId: 1, Name: 'New Family'},
        { applicationId: 2, Name: 'Current KOC Family (KOC Priority is Established After 3 Months of KOC Affiliation)' }
        ];

        $scope.level1List = [
        { level1Id: 1, Name: 'Faculty/Staff' },
        { level1Id: 2, Name: 'Student' },
        { level1Id: 3, Name: 'Grandparent' },
        { level1Id: 4, Name: 'Alumni' }
        ];

        $scope.level2List = [];
        $scope.level3List = [];

        $scope.$watch('user.level1', function (newVal, oldVal) {

            if (newVal == 1 || newVal==3){

                $scope.level2List = [ { level2Id:1, Name: 'Information System'},
                                      { level2Id:2, Name: 'Computer Science'}];                     
            }
            else if (newVal == 2){
                            $scope.level2List = [ { level2Id:3, Name: 'Undergraduate'},
                                                  { level2Id:4, Name: 'Graduate' } ];
                        }
            else if (newVal == 4){
                $scope.level2List = [ { level2Id:5, Name: 'Class of'}];
            }
        });

        $scope.$watch('user.level2', function (newVal, oldVal) {

            if (newVal == 1 || newVal==2 || newVal==3 ){

                $scope.level3List = [ { level3Id:1, Name: 'Full Time'},
                                      { level3Id:2, Name: 'Part Time'},
                                     ];
            }
            else if(newVal == 5){
                 $scope.level3List = [];
                 for(var i = 0, start = 1900; i < 150; i++) {
                  $scope.level3List.push({level3Id:3, Name: start + i});
                }
                
            }
        });
        
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

            // Set the 'submitted' flag to true
            $scope.submitted = true;

            if ($scope.userForm.$valid) {
                alert("Form is valid!");
            }
            else {
                alert("Please correct errors!");
            }
        };

    }])
;