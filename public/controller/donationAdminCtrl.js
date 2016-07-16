/**
 *Created by Lixing Zhao on 05/28/16 
 */

app.controller('donationAdminCtrl', function($scope, $http, $location, $window, Auth) {
   var self = this;
       self.donationEvent = {
                     name: 'no-event-now',
                     status: 'active',
                     message: 'no event is defined'
                     };

       self.donationType = {
                     name: 'no-type-now',
                     status: 'available',
                     information: 'no custom donation type is defined'
                     };

   $scope.donationEvent = self.donationEvent;
   $scope.donationType  = self.donationType;

   $scope.statusMessage0 = '';
   $scope.statusMessage1 = '';
   $scope.eventMode =  "Edit";

   //user authentication logic

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

   $scope.manageMode = 'event';
   $scope.toggleMode = "type";
   $scope.toggleManageMode = function() {
      var temp = $scope.manageMode;
      $scope.manageMode = $scope.toggleMode;
      $scope.toggleMode = temp;
   };

   $scope.activeEventName = '';

   $scope.currentNotice   = '';                 //the selected value
   $scope.donationNotices = [];                 //the options for the 'switch notice' selection
   $scope.currentDType    = '';
   $scope.dTypeArray      = [];      

   // three dropdown controls for filter the donation table
   $scope.currentType = '--list all--';
   $scope.donationTypes = ['--list all--'];

   $scope.currentEvent = '--list all--';
   $scope.donationEvents = ['--list all--'];

   $scope.currentParent = '--list all--';
   $scope.donationParents = ['--list all--'];

   $scope.donations = [];     // all the donations fetched from DB
   $scope.dTypes = [];        // all the donation type from DB
   $scope.events = [];        // all the events fetched from DB

   // filter used for select donations for table display
   var donationFilter = function(donation) {
      if (($scope.currentType != '--list all--') && 
          ($scope.currentType != donation.type)) {
          return false; 
      }
      if (($scope.currentEvent != '--list all--') && 
          ($scope.currentEvent != donation.event)) {
          return false; 
      }
      if (($scope.currentParent != '--list all--') && 
          ($scope.currentParent != donation.email)) {
          return false; 
      }
      return true;
   }

   // fetch all donations from the DB. creates data for three dropdown controls
   // sort the data based on the date and fill the donations list  
   var fetchDonations = function() {
      return $http.get('/donations').then(
      function(response) {
         $scope.donations = [];
         response.data.forEach(function(entry) {
            if ($scope.donationTypes.indexOf(entry.type) == -1) {
               $scope.donationTypes.push(entry.type); //enter value into donationTypes to be displayed
            }
            if ($scope.donationEvents.indexOf(entry.event) == -1) {
               $scope.donationEvents.push(entry.event); 
            }
            if ($scope.donationParents.indexOf(entry.email) == -1) {
               $scope.donationParents.push(entry.email);
            }
            if (donationFilter(entry)) {
               $scope.donations.push(entry);
            }
         })
//         $scope.donations.sort().reverse();
      }, function(errResponse) {
            console.error('Error while fetching donations');
         });
      };

   // fetch all events from the DB. creates data for switch event dropdown control
   // handle the case when there has no event entry in the DB 
   var fetchEvents = function() {
      return $http.get('/events').then(
      function(response) {
         $scope.events = response.data;
         if ($scope.events.length == 0) {
            $scope.donationNotices = ['No-event'];
            $scope.currentNotice = $scope.donationNotices[0];
            $scope.donationEvent = self.donationEvent;
         } else {
            for (var i = 0; i < $scope.events.length; i++) {
               if ($scope.events[i].status == 'active') {
                  $scope.activeEventName = $scope.events[i].name;
               }
            }
            if (($scope.eventMode == 'Edit') && ($scope.donationNotices.length != 0)) {
               return;  /****/
            }

            $scope.donationNotices = [];
            for (var i = 0; i < $scope.events.length; i++) {
               $scope.donationNotices.push($scope.events[i].name);
               $scope.currentNotice  = $scope.events[i].name;
               $scope.donationEvent  = $scope.events[i];
               self.donationEvent = $scope.events[i];
            }
         }
         $scope.currentColor = $scope.donationEvent.color;

     }, function(errResponse) {
            console.error('Error while fetching events');
         });
      };

   // fetch all donation types from the DB. creates data for dType dropdown control
   // handle the case when there has no entry in the DB 
   var fetchDTypes = function() {
      return $http.get('/dTypes').then(
      function(response) {
         $scope.activeDTypes = ['Money'];
         $scope.dTypes = response.data;
         if ($scope.dTypes.length == 0) {
            $scope.dTypeArray   = ['No-donation-type'];
            $scope.currentDType = $scope.dTypeArray[0];
            $scope.donationType = self.donationType;
         } else {

            for (var i = 0; i < $scope.dTypes.length; i++) {
               if ($scope.dTypes[i].status == 'active') {
                  $scope.activeDTypes.push($scope.dTypes[i].name);
               }
            }
            if (($scope.dTypeMode == 'Edit') && ($scope.dTypeArray.length != 0)) {
               return;  /****/
            }

            $scope.dTypeArray = [];
            for (var i = 0; i < $scope.dTypes.length; i++) {
               $scope.dTypeArray.push($scope.dTypes[i].name);
               $scope.currentDType  = $scope.dTypes[i].name;
               $scope.donationType  = $scope.dTypes[i];
               setupCheckBox();
               self.donationType = $scope.dTypes[i];
            }
         }
     }, function(errResponse) {
            console.error('Error while fetching donation types');
         });
      };

   fetchDonations();    //the function call to get donations from DB
   fetchDTypes();       //the function call to get donation type from DB
   fetchEvents();       //the function calk to get events from DB

   // change to view different event
   $scope.changeNotice = function() {
      for (var i = 0; i < $scope.events.length; i++) {
         if ($scope.events[i].name == $scope.currentNotice) {
            $scope.donationEvent = $scope.events[i];
              self.donationEvent = $scope.events[i]; 
            $scope.textChanged();  
         }
      }
   };

   $scope.changeDType = function() {
      for (var i = 0; i < $scope.dTypes.length; i++) {
         if ($scope.dTypes[i].name == $scope.currentDType) {
            $scope.donationType = $scope.dTypes[i];
            setupCheckBox();
            self.donationType = $scope.dTypes[i]; 
            $scope.textChanged();  
         }
      }
   };


   // clear the status message
   $scope.textChanged = function() {
      $scope.statusMessage0 = '';
      $scope.statusMessage1 = '';
   }

   // the functions for dropdown control's ng-change
   $scope.getType = function() {
      console.log($scope.currentType);
      fetchDonations();
   };

   $scope.getEvent = function() {
      fetchDonations();
   };

   $scope.getParent = function() {
      fetchDonations();
   };

   $scope.getColor = function() {
      $scope.donationEvent.color = $scope.currentColor;
   };

   // enter the 'create' mode
   $scope.eventCreate = function() {
      $scope.eventMode = "Create";
      $scope.donationEvent = {
                     name: '',
                     status: 'ready',
                     message: ''
                     };
   };

   // enter the 'edit' mode
   $scope.eventEdit = function() {
      $scope.eventMode = "Edit";
      $scope.donationEvent = self.donationEvent;
   };

   // need all fields be filled for creating new event entry
   var validatedEvent = function() {
      var missingItems = [];

      for (var key in $scope.donationEvent) {
         if (!$scope.donationEvent[key]) {
            missingItems.push(key);
         }
      }
      return missingItems;
   };
   
   // create new event entry in DB
   $scope.eventAdd = function() {
      var badList = validatedEvent();
      if (badList.length != 0) {
         $scope.statusMessage0 = "missing [" + badList + "]";
         return;
      }
      if ($scope.events.length == 0) {
         $scope.donationEvent.status = 'active';   
      }

      var newData = $scope.donationEvent;
      $http.post('/events', newData)
         .then(fetchEvents) //add to currentNotice
         .then(function(response) {
             $scope.eventEdit(); //put into edit mode after new event added
             $scope.statusMessage1 = 'database entry created';
         });
   };

  // update existing event entry in DB
   $scope.eventUpdate = function() {
       if ($scope.donationEvent.name == 'no-event-now') {
         $scope.eventCreate();
         $scope.statusMessage0 = 'default one: update is not possible';
         return;
      }

      for (var i = 0; i < $scope.events.length; i++) {
         if ($scope.events[i].name == $scope.currentNotice) {     // mark it as current 'active'
            $scope.donationEvent.status = 'active';
            $http.put('/events/' + $scope.donationEvent._id, $scope.donationEvent) 
              .then(function(response) {
            });
         } else {
            var changeData = {status: 'ready'};                   // all the other mark as 'ready'
            $http.put('/events/' + $scope.events[i]._id, changeData) 
              .then(function(response) {
            });
         }
      }
      fetchEvents();
      $scope.activeEventName = $scope.currentNotice;
      $scope.statusMessage1 = "update done. This is the 'current-active' event";
   };

   // delete entry in the DB
   $scope.eventDelete = function() {
      if ($scope.currentNotice == 'No-event') {
         return;
      }
      if ($scope.donationEvent.status == 'active') {
         $scope.statusMessage0 = 'can not delete active event';
         $scope.statusMessage1 = 'can not delete active event';
         return;
      }
      $scope.eventMode = 'Delete';
      $http.delete('/events/' + $scope.donationEvent._id) 
         .then(fetchEvents) 
         .then(function(response) {
             if ($scope.currentNotice == 'No-event') {
                $scope.eventCreate();
             }
             else {
                $scope.eventEdit();
              }
         });
   };

   //************************************************************************

   $scope.dTypeMode = "Edit";
   $scope.cbValue   = true;

   var setupCheckBox = function() {
      if ($scope.donationType.status == 'active') {
         $scope.cbValue = true;
      } else {
         $scope.cbValue = false;
      }
   };

   $scope.dTypeCreate = function() {
      $scope.dTypeMode = "Create";
      $scope.donationType = {
                     name: '',
                     status: 'active',
                     information: ''
                     };
   };

   $scope.dTypeEdit = function() {
      $scope.dTypeMode = "Edit";
      $scope.donationType = self.donationType;
      setupCheckBox();
   };

      // create new event entry in DB
   $scope.dTypeAdd = function() {
      var newData = $scope.donationType;
      $http.post('/dTypes', newData)
         .then(fetchDTypes) //add to currentNotice
         .then(function(response) {
             $scope.dTypeEdit(); //put into edit mode after new type added
             $scope.statusMessage1 = 'database entry created';
         });
   };

   $scope.dTypeUpdate = function() {
      if ($scope.donationType.name == 'no-type-now') {
         $scope.dTypeCreate();
         $scope.statusMessage0 = 'default one: update is not possible';
         return;
      }

      if ($scope.cbValue) {     // mark it as current 'active'
         $scope.donationType.status = 'active';
      } else {
         $scope.donationType.status = 'available';
      }
      $http.put('/dTypes/' + $scope.donationType._id, $scope.donationType) 
         .then(function(response) {});
      
      fetchDTypes();
      $scope.statusMessage1 = 'database entry updated';
   };

   $scope.dTypeDelete = function() {

   };

   $scope.dTypeDelete = function() {
      if ($scope.activeDTypes.length == 1) {
         return;
      }
      $scope.dTypeMode = 'Delete';
      $http.delete('/dTypes/' + $scope.donationType._id) 
         .then(fetchDTypes) 
         .then(function(response) {
             if ($scope.activeDTypes.length == 1) {
                $scope.dTypeCreate();
             }
             else {
                $scope.dTypeEdit();
              }
         });
   };

   // the following code is for sorting the table

   $scope.sortColumn = 'created';
   $scope.sortData = function(column) {
      $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
      $scope.sortColumn = column;
   };

   $scope.getSortClass = function(column) {
      if ($scope.sortColumn == column) {
         return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
      }
      return '';
   };
});

  