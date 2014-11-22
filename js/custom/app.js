'use strict';

var app = angular.module('ras', ['ngCookies', 'ngRoute', 'ngAnimate']).
config(function($routeProvider, $httpProvider) {
	$routeProvider
	.when('/', { // halaman depan
		templateUrl: 'html/home.html', 
		controller: 'MainCtrl' 
	})
	.when('/login', { 
		templateUrl: 'html/login.html', 
		controller: 'LoginCtrl' 
	})
	.when('/buku', { 
		templateUrl: 'html/buku.html', 
		controller: 'BukuCtrl' 
	})
	.when('/file', { 
		templateUrl: 'html/file.html', 
		controller: 'FileCtrl' 
	})
	.when('/user/buku', { 
		templateUrl: 'html/buku.html', 
		controller: 'BukuCtrl' 
	})
	.when('/user/file', { 
		templateUrl: 'html/file.html', 
		controller: 'FileCtrl' 
	})
	.when('/admin/anggota', { 
		templateUrl: 'html/admin/anggota.html', 
		controller: 'PetugasCtrl' 
	})
	.when('/admin/buku', { 
		templateUrl: 'html/admin/buku.html', 
		controller: 'PetugasCtrl' 
	})
	.otherwise({ redirectTo: '/' });
	
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data;
	}];
}).
run(['$rootScope', '$location', function($rootScope, $location) {
	// server url
	var protocol 	= 'http',
		host		= 'perpustakaan.com',
		port		= '80';
	$rootScope.server = protocol + '://' + host + (port != '80' ? ':' + port : '');
	
	$rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
		$location.path('/login').replace();
	});
}]);
