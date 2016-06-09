app.controller('donationCtrl', function($scope, $http, $location, $window, Auth) {
   var self = this;
       self.donationEvent = {
                     name: 'Chrismas',
                     status: 'active',
                     header: 'Dear Parents',
                     greeting: 'Thanks',
                     author: 'Jenny Homer',
                     line_1: 'At this moment, we do not have any event that requires special',
                     line_2: 'donation.  However, any donation for general use is highly',
                     line_3: 'appreciated.',
                     color: '#000000',
                     textLeft: '200px',
                     textTop: '50px',
                     image: '../images/events/christmasMessage.png',
                     };

      $scope.donationEvent = self.donationEvent;

      $scope.currentType = 'Money';
      $scope.donationTypes = ['Money', 'Food', 'Supplies', 'Others'];

      $scope.currentEvent = '';
      $scope.donationEvents = [];

      $scope.donations = [];
      $scope.events = [];
      $scope.newDonations = {};

    //get info if a persion is logged in
      if (Auth.isLoggedIn()) {
         Auth.getUser()
            .then(function(data) {
                $scope.username = data.data.fName + " " + data.data.lName;
                $scope.email = data.data.email;
                $scope.fName = data.data.fName;
                $scope.lName = data.data.lName;
            });
      } else {
         $location.path("/login");
      };

   var fetchDonations = function() {
      return $http.get('/donations').then(
      function(response) {
         $scope.donations = response.data;
         $scope.donations.sort().reverse(); 
      }, function(errResponse) {
            console.error('Error while fetching donations');
         });
      };

   var fetchEvents = function() {
      return $http.get('/events').then(
      function(response) {
         $scope.events = response.data;
         if ($scope.events.length == 0) {
            $scope.donationEvents = ['Not-specified'];
            $scope.currentEvent  = $scope.donationEvents[0];
         } else {
            for (var i = 0; i < $scope.events.length; i++) {
               $scope.donationEvents.push($scope.events[i].name);
               if ($scope.events[i].status == 'active') {
                  $scope.currentEvent  = $scope.events[i].name;
                  $scope.donationEvent = $scope.events[i];
               }
            }
         }
      }, function(errResponse) {
            console.error('Error while fetching events');
         });
      };

   fetchDonations();
   fetchEvents();

   $scope.switchEvent = function() {
      for (var i = 0; i < $scope.events.length; i++) {
         if ($scope.events[i].name == $scope.currentEvent) {
            $scope.donationEvent = $scope.events[i];
         }
      }
   };

   $scope.add = function() {
     var newData = $scope.newDonations;
     newData['fName'] = $scope.fName;
     newData['lName'] = $scope.lName;
     newData['email'] = $scope.email;
     newData['event'] = $scope.currentEvent;
     newData['type' ] = $scope.currentType;

     if (newData['type'] == 'Money') {
         newData['description'] = "N/A";
     };

     $http.post('/donations', newData)
         .then(fetchDonations)
         .then(function(response) {
           $scope.newDonations = {};
         });
   };
});
