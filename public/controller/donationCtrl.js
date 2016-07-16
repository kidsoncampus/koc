/**
 *Created by Lixing Zhao on 05/17/16 
 */

app.controller('donationCtrl', function($scope, $http, $location, $window, Auth) {
   var self = this;
       self.donationEvent = {
                     name: 'no-event-now',
                     status: 'active',
                     nessage: ''
                     };
     
   $scope.donationEvent = self.donationEvent;

   $scope.currentType = 'Money';
   $scope.donationTypes = ['Money'];

   $scope.currentEvent = '';
   $scope.donationEvents = [];

   $scope.donations = [];
   $scope.dTypes = [];
   $scope.events = [];
   $scope.newDonations = {};

    // this function call provide the information text to the template (HTML page)
   $scope.getDonationInfo = function() {
      for (var i = 0; i < $scope.dTypes.length; i++) {
         if ($scope.dTypes[i].name == $scope.currentType) {
            return $scope.dTypes[i].information;
         }
      }
   };

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

   // fetch all donation types from the DB. creates data for dType dropdown control
   // handle the case when there has no entry in the DB 
   var fetchDTypes = function() {
      return $http.get('/dTypes').then(
      function(response) {
         $scope.dTypes = response.data;
         if ($scope.dTypes.length != 0) {
            for (var i = 0; i < $scope.dTypes.length; i++) {
               if ($scope.dTypes[i].status == 'active') {
                  $scope.donationTypes.push($scope.dTypes[i].name);
               }
            }
         }
      }, function(errResponse) {
            console.error('Error while fetching donation types');
         });
      };

   fetchDonations();
   fetchDTypes();
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

    $scope.getEventMessage = function() {
        var message = $scope.donationEvent['message'];
        if (typeof(message) != 'undefined') {
           return message.replace('/\n','<br/>');
        }
    };
      

});
