
var app=angular.module ('kocApp', ['app.routes','authService','ngAnimate','ui.bootstrap']);

// application configuration to integrate token into requests
app.config(function($httpProvider){
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});



