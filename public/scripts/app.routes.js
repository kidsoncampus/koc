/**
 * Created by LucyQiao on 5/18/16.
 */
angular.module('app.routes',['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
        .when('/homepage', {
            templateUrl : 'templates/homepage.html',
        })
        //route for the program.html
        .when('/program',{
            templateUrl : 'templates/program.html',
        })
        //route for currentParent.html
        .when('/currentParent',{
            templateUrl : 'templates/currentParent.html',
            controller: 'loginCtrl',
            controllerAs:'login'
        })
        //route for parentdashboard.html
        .when('/parentDashboard',{
            templateUrl : 'templates/parentDashboard.html',
            controller : 'parentDashCtrl'
        })
        ////route for editProfile.html
        .when ('/editUserProfile/:userId', {
            templateUrl : 'templates/editProfile.html',
            controller : 'editProfileCtrl'
        })
        //route for waitinglist.html
        .when ('/waitinglist', {
            templateUrl : 'templates/waitinglist.html',
            controller : 'wListController'
        })
        //route for page to edit an emergency Contact
        .when ('/edit/:appliID', {
            templateUrl : 'templates/editE.html',
            controller : 'editECtrl'
        })
        .when ('/adminDashboard', {
            templateUrl : 'templates/adminDashboard.html',
            controller : 'adminCtrl',
            controllerAs:'adminDash'
        })
        //route for emergencyContact.html
        .when ('/emergencyContact', {
            templateUrl : 'templates/emergencyContact.html',
            controller : 'emergencyCtrl'
        })
        //route for notificationAdmin.html
        .when ('/notificationAdmin', {
            templateUrl : 'templates/notificationAdmin.html',
            controller : 'notificationCtrl'
        })        
        //route for donation.html
        .when ('/donation', {
            templateUrl : 'templates/donation.html',
            controller : 'donationCtrl'
        })
        .when ('/donationAdmin', {
            templateUrl : 'templates/donationAdmin.html',
            controller : 'donationAdminCtrl'
        })
        //route for signup.html
        .when ('/signup', {
            templateUrl : 'templates/signup.html',
            controller: 'signCtrl'
        })
        //route for login.html
        .when ('/login', {
            templateUrl : 'templates/login.html',
            controller: 'loginCtrl',
            controllerAs:'login'
        })
        .otherwise ('/homepage');


});
