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
        //route for waitinglist.html
        .when ('/waitinglist', {
            templateUrl : 'templates/waitinglist.html',
            controller : 'wListController'
        })
        //route for donation.html
        .when ('/donation', {
            templateUrl : 'templates/donation.html',
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
