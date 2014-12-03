/*peminjaman controller */
app.controller('PeminjamanPetugasCtrl', function($scope, $http) {
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	//load data peminjaman
	$scope.cpagepjm = 0;
	$scope.numpagepjm = 0;
	$scope.kata='';
	$scope.pjm={
		anggota:'',buku:''
	}
	
	$scope.dbPjm=[];
	$scope.loadDataPjm=function(){
		$http({
			url: $scope.server+'/admin/peminjaman?cpagepjm='+$scope.cpagepjm+'&kata='+$scope.kata, method:'GET'
		}).
		success(function(d){
			$scope.dbPjm=d.data;
			$scope.numpagepjm=d.numpagepjm;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataPjm(); //panggil fungsi
	
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetPjm();
	};
	
	$scope.setEdit=function(i){
		$scope.pjm=$scope.dbPjm[i];
		$scope.editing = true;
	}
	
	$scope.dataPinjam = [];
	$scope.tambahPinjam=function(){
		$http({
			url: $scope.server+'/cekbuku/'+$scope.pjm.buku, method:'GET'
		}).
		success(function(d){
			$scope.dataPinjam.push(d);
			$scope.pjm.buku='';
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Kode buku yang anda cari tidak ditemukan atau stok buku kosong');
			$scope.pjm.buku='';
		});
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
	
	$scope.setPagpjm = function(){
		$scope.cpagepjm = this.n;
		$scope.loadDataPjm();
	};
	$scope.prevPagepjm = function(){
		if($scope.cpagepjm > 0 )
			$scope.cpagepjm--;
		$scope.loadDataPjm();
	};
	$scope.nextPagepjm = function(){
		if($scope.cpagepjm < $scope.numpagepjm -1)
			$scope.cpagepjm;
		$scope.loadDataPjm();
	};
	
});
