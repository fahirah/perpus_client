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

/*home controller */
app.controller('HomeCtrl', function($scope, $http){
	//load data buku
	$scope.cpagebk = 0;
	$scope.numpagebk = 0;
	$scope.cpagefl = 0;
	$scope.numpagefl = 0;
	$scope.search={
		judul:'', pengarang:'', penerbit:'', isbn:'', tipe:''
	};
	$scope.db=[];
	$scope.dbFile=[];
	
	$scope.loadDataSearch=function(){
		$http({
			url: $scope.server+'/pencarian?cpagebk='+$scope.cpagebk+'&cpagefl='+$scope.cpagefl+'&judul='+$scope.search.judul+'&pengarang='+$scope.search.pengarang+'&penerbit='+$scope.search.penerbit+'&isbn='+$scope.search.isbn+'&tipe='+$scope.search.tipe, method:'GET'
		}).
		success(function(d){
			$scope.db=d.buku.data;
			$scope.numpagebk=d.buku.numpagebk;
			$scope.dbFile=d.file.data;
			$scope.numpagefl=d.file.numpagefl;
			
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataSearch(); //panggil fungsi
	
	$scope.batal = function(){
		$scope.detail=false;
		$scope.detailfile=false;
	};
	
	$scope.detail = false;
	$scope.dataDetail = [];
	$scope.tampilDetail = function(i) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/detailbuku/'+i, method:'GET'
		}).
		success(function(d){
			$scope.dataDetail=d.data;
		});
	}
	
	$scope.detailfile = false;
	$scope.dataDetailFile = [];
	$scope.tampilDetailFile = function(i) {
		$scope.detailfile = true;
		$http({
			url: $scope.server+'/detailfile/'+i, method:'GET'
		}).
		success(function(d){
			$scope.dataDetailFile=d.data;
		});
	}
	
	$scope.buku = {
		judul:'', pengarang:'', penerbit:'', isbn:'', tipe:''
	};
	
	$scope.search={
		judul:'', pengarang:'', penerbit:'', isbn:'', tipe:''
	}
	
	//pagination buku
	$scope.jph=10;
	
	$scope.range = function(startbk, end){
		var r = [];
		if( ! end){
			end = startbk; startbk = 0;
		}
		for(var i = startbk; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagebk = function(){
		$scope.cpagebk = this.n;
		$scope.loadDataSearch();
	};
	$scope.prevPagebk = function(){
		if($scope.cpagebk > 0 )
			$scope.cpagebk--;
		$scope.loadDataSearch();
	};
	$scope.nextPagebk = function(){
		if($scope.cpagebk < $scope.numpagebk -1)
			$scope.cpagebk;
		$scope.loadDataSearch();
	};	
	
	
	$scope.range = function(startfl, end){
		var r = [];
		if( ! end){
			end = startfl; startfl = 0;
		}
		for(var i = startfl; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagefl = function(){
		$scope.cpagefl = this.n;
		$scope.loadDataSearch();
	};
	$scope.prevPagefl = function(){
		if($scope.cpagefl > 0 )
			$scope.cpagefl--;
		$scope.loadDataSearch();
	};
	$scope.nextPagefl = function(){
		if($scope.cpagefl < $scope.numpagefl -1)
			$scope.cpagefl;
		$scope.loadDataSearch();
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
	$scope.cpagefl = 0;
	$scope.numpagefl = 0;
	$scope.search={
		kata:'',jenis:''
	};
	
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/file?cpagefl='+$scope.cpagefl+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
		}).
		success(function(d){
			$scope.db=d.data;
			$scope.numpagefl=d.numpagefl;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadData(); //panggil fungsi
	
	$scope.file=null;
	$scope.berkas = {};	
	
	$scope.resetBerkas= function(){
		$scope.berkas={
			id:'',nama:'', judul:'',pengarang:'', macam:'', bahasa:'', penerbit:'', tahun:'', ringkasan:'', tgl:''
		};
	};	
	$scope.resetBerkas();

	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetBerkas();
	};
	
	$scope.setEdit=function(i){
		$scope.berkas=$scope.dbFile[i];
		$scope.editing = true;
	}
	
	//pagination file
	$scope.jph=20;
	
	$scope.range = function(start, end){
		var r = [];
		if( ! end){
			end = start; start = 0;
		}
		for(var i = start; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagefl = function(){
		$scope.cpagefl = this.n;
		$scope.loadData();
	};
	$scope.prevPagefl = function(){
		if($scope.cpagefl > 0 )
			$scope.cpagefl--;
		$scope.loadData();
	};
	$scope.nextPagefl = function(){
		if($scope.cpagefl < $scope.numpagefl -1)
			$scope.cpagefl++;
		$scope.loadData();
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
				$location.path('/user/beranda').replace();
			} else {
				$location.path('/admin/beranda').replace();
			}
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Anda Gagal Login');
		});
	};
});
