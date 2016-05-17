
var app=angular.module ('kocApp', ['ngRoute', 'ngStorage','ngAnimate','ui.bootstrap']);

app.config(function($routeProvider){
		$routeProvider
		.when('/homepage', {
			templateUrl : 'templates/homepage.html',
			controller : 'MainController'
		})
		//route for the program.html
		.when('/program',{
			templateUrl : 'templates/program.html',
			controller : 'MainController'
		})
		//route for currentParent.html
		.when('/dashboard/:user_id',{
			templateUrl : 'templates/currentParent.html',
			controller : 'dashboardCtrl'
		})	
		//route for waitinglist.html
		.when ('/waitinglist', {
			templateUrl : 'templates/waitinglist.html',
			controller : 'wListController'
		})
		//route for donation.html
		.when ('/donation', {
			templateUrl : 'templates/donation.html',
			controller : 'MainController'
		})
		//route for signup.html
		.when ('/signup', {
			templateUrl : 'templates/signup.html',
			controller: 'signCtrl'
		})	
		//route for login.html
		.when ('/login', {
			templateUrl : 'templates/login.html',
			controller: 'loginCtrl'
		})	
		.otherwise ('/homepage');
	})
;
