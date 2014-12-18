'use strict';

var app = angular.module('ras', ['ngCookies', 'ngRoute', 'ngAnimate']).
config(function($routeProvider, $httpProvider) {
	$routeProvider
	.when('/', { // halaman depan
		templateUrl: 'html/home.html', 
		controller: 'HomeCtrl' 
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
		templateUrl: 'html/user/buku.html', 
		controller: 'BukuAnggotaCtrl' 
	})
	.when('/user/file', { 
		templateUrl: 'html/user/file.html', 
		controller: 'FileAnggotaCtrl' 
	})
	.when('/user/peminjaman', { 
		templateUrl: 'html/user/peminjaman.html', 
		controller: 'PeminjamanAnggotaCtrl' 
	})
	.when('/admin/anggota', { 
		templateUrl: 'html/admin/anggota.html', 
		controller: 'PetugasCtrl' 
	})
	.when('/admin/buku', { 
		templateUrl: 'html/admin/buku.html', 
		controller: 'BukuPetugasCtrl' 
	})
	.when('/admin/file', { 
		templateUrl: 'html/admin/file.html', 
		controller: 'FilePetugasCtrl' 
	})
	.when('/admin/peminjaman', { 
		templateUrl: 'html/admin/peminjaman.html', 
		controller: 'PeminjamanPetugasCtrl' 
	})
	.when('/admin/pengaturan', { 
		templateUrl: 'html/admin/pengaturan.html', 
		controller: 'PengaturanPetugasCtrl' 
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
