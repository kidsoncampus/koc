app.controller('donationAdminCtrl', function($scope, $http, $location, $window, Auth) {
   var self = this;
       self.donationEvent = {
                     name: 'no-event-now',
                     status: 'active',
                     header: 'Dear Parents',
                     greeting: 'Thanks',
                     author: 'KOC Admin',
                     line_1: 'At this moment, we do not have any event that requires special',
                     line_2: 'donation.  However, any donation for general use is highly',
                     line_3: 'appreciated.',
                     color: '#000000',
                     textLeft: '200px',
                     textTop: '50px',
                     image: '../images/events/christmasMessage.png',
                     };

   $scope.donationEvent = self.donationEvent;
   $scope.statusMessage0 = '';
   $scope.statusMessage1 = '';
   $scope.mode =  "Edit";

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

   //the text color selection box
   $scope.currentColor = $scope.donationEvent.color;
   $scope.colors = [{name:'Black',   value:'#000000'},
                    {name:'Red',     value:'#ff0000'},
                    {name:'Blue',    value:'#0000ff'},
                    {name:'Navy',    value:'#000080'},
                    {name:'Green',   value:'#228b22'},
                    {name:'Magenta', value:'#ff00ff'},
                    {name:'White',   value:'#ffffff'}];

   $scope.currentNotice = '';                   //the selected value
   $scope.donationNotices = [];                 //the options for the 'switch notice' selection      

   // three dropdown controls for filter the donation table
   $scope.currentType = '--list all--';
   $scope.donationTypes = ['--list all--'];

   $scope.currentEvent = '--list all--';
   $scope.donationEvents = ['--list all--'];

   $scope.currentParent = '--list all--';
   $scope.donationParents = ['--list all--'];

   $scope.donations = [];     // all the donations fetched from DB
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
         $scope.donations.sort().reverse();
      }, function(errResponse) {
            console.error('Error while fetching donations');
         });
      };

   // fetch all events from the DB. creates data for switch event dropdown control
   // handle the case when there has not event entry in the DB 
   var fetchEvents = function() {
      return $http.get('/events').then(
      function(response) {
         $scope.events = response.data;
         if ($scope.events.length == 0) {
            $scope.donationNotices = ['No-event'];
            $scope.currentNotice = $scope.donationNotices[0];
            $scope.donationEvent = self.donationEvent;
         } else {
            if (($scope.mode == 'Edit') && ($scope.donationNotices.length != 0)) {
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

   fetchDonations();    //the function call to get donations from DB
   fetchEvents();       //the function calk to get events from DB

   // change to view different event
   $scope.changeEvent = function() {
      for (var i = 0; i < $scope.events.length; i++) {
         if ($scope.events[i].name == $scope.currentNotice) {
            $scope.donationEvent  = $scope.events[i];
            self.donationEvent = $scope.events[i]; 
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
   $scope.create = function() {
      $scope.mode = "Create";
      $scope.donationEvent = {
                     name: '',
                     status: 'ready',
                     header: '',
                     greeting: '',
                     author: '',
                     line_1: '',
                     line_2: '',
                     line_3: '',
                     color: '#000000',
                     textLeft: '200px',
                     textTop: '50px',
                     image: '../images/events/christmasMessage.png',
                     };

      $scope.currentColor = $scope.donationEvent.color;
   };

   // enter the 'edit' mode
   $scope.edit = function() {
      $scope.mode = "Edit";
      $scope.donationEvent = self.donationEvent;
      $scope.currentColor = $scope.donationEvent.color;
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
   $scope.add = function() {
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
             $scope.edit(); //put into edit mode after new event added
             $scope.statusMessage1 = 'database entry created';
         });
   };

  // update existing event entry in DB
   $scope.update = function() {
      if ($scope.donationEvent.name == 'no-event-now') {
         $scope.create();
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
      $scope.statusMessage1 = "update done. This is the 'current-active' event";
   };

   // delete entry in the DB
   $scope.delete = function() {
      if ($scope.currentNotice == 'No-event') {
         return;
      }
      if ($scope.donationEvent.status == 'active') {
         $scope.statusMessage0 = 'can not delete active event';
         $scope.statusMessage1 = 'can not delete active event';
         return;
      }
      $scope.mode = 'Delete';
      $http.delete('/events/' + $scope.donationEvent._id) 
         .then(fetchEvents) 
         .then(function(response) {
             if ($scope.currentNotice == 'No-event') {
                $scope.create();
             }
             else {
                $scope.edit();
              }
         });
   };
});
