'use strict';

/* main controller */
app.controller('MainCtrl', function($scope, $cookies, $location) {
	$scope.user = { id: 0, token: '', status: 0 };
	$scope.setUser = function(d) {
		for (var i in d) {
			$scope.user[i] = d[i];
			$cookies[i] = d[i];
		}
	};
	$scope.checkUser = function() {
		if ( ! angular.isUndefined($cookies.id)) {
			for (var i in $cookies) {
				$scope.user[i] = $cookies[i];
			}
			return true;
		} else return false;
	};
	$scope.disconnect = function() {
		$scope.user = { id: 0, token: '', status: 0 };
		for (var i in $cookies) delete $cookies[i];
		$location.path('/').replace();
	};
	
	
});

/*buku controller */
app.controller('BukuCtrl', function($scope, $http){
	//load data buku
	$scope.cpagebk = 0;
	$scope.numpagebk = 0;
	$scope.search={
		kata:'',jenis:''
	};
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/buku?cpagebk='+$scope.cpagebk+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
		}).
		success(function(d){
			$scope.db=d.data;
			$scope.numpagebk=d.numpagebk;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadData(); //panggil fungsi
	
	$scope.buku = {
		judul:'', pengarang:'', stok:'', macam:'', bahasa:'', penerbit:'', tahun:''
	};
	
	$scope.search={
		kata:'', jenis:''
	}
	
	//pagination buku
	$scope.jph=20;
	
	$scope.range = function(start, end){
		var r = [];
		if( ! end){
			end = start; start = 0;
		}
		for(var i = start; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagebk = function(){
		$scope.cpagebk = this.n;
		$scope.loadData();
	};
	$scope.prevPagebk = function(){
		if($scope.cpagebk > 0 )
			$scope.cpagebk--;
		$scope.loadData();
	};
	$scope.nextPagebk = function(){
		if($scope.cpagebk < $scope.numpagebk -1)
			$scope.cpagebk;
		$scope.loadData();
	};	
});

/*file controller */
app.controller('FileCtrl', function($scope, $http){
	//load data file
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/file', method:'GET'
		}).
		success(function(d){
			$scope.db=d;
		});
	};
	$scope.loadData(); //panggil fungsi
	
	$scope.file = {
		judul:'', pengarang:'', macam:'', bahasa:'', penerbit:'', tahun:'', ringkasan:'', tgl:''
	};
});



/* login controller */
app.controller('LoginCtrl', function($scope,$http,$location) {
	$scope.login = {
		username:'',password:'',status: 1
	};
	
	//login
	$scope.ceklogin=function(){
		$http({
			url:$scope.server + '/login', method:'POST', data:$scope.login
		}).
		success(function(d){
			//kalau sukses
			alertify.success('Anda Berhasil Login');
			$scope.setUser(d);
			if (d.status == 1) {
				$location.path('/admin').replace();
			} else {
				$location.path('/user').replace();
			}
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Anda Gagal Login');
		});
	};
});

