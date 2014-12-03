/*buku  controller */
app.controller('BukuPetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
		
	//load data buku
	$scope.cpagebk = 0;
	$scope.numpagebk = 0;
	$scope.search={
		kata:'',jenis:''
	};

	$scope.dbBuku=[];
	$scope.loadDataBuku=function(){
		$http({
			url: $scope.server+'/admin/buku?cpagebk='+$scope.cpagebk+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
		}).
		success(function(d){
			$scope.dbBuku=d.data;
			$scope.numpagebk=d.numpagebk;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataBuku(); //panggil fungsi
	
	$scope.buku = {};
	
	$scope.resetBuku= function(){
		$scope.buku={
			id:'', kode:'', judul:'', pengarang:'', stok:'', macam:'', bahasa:'', penempatan:'', penerbit:'', tahun:''
		};
	};
	$scope.resetBuku();
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetBuku();
	};
	
	
	$scope.setEdit=function(i){
		$scope.buku=$scope.dbBuku[i];
		$scope.editing = true;
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
		$scope.loadDataBuku();
	};
	$scope.prevPagebk = function(){
		if($scope.cpagebk > 0 )
			$scope.cpagebk--;
		$scope.loadDataBuku();
	};
	$scope.nextPagebk = function(){
		if($scope.cpagebk < $scope.numpagebk -1)
			$scope.cpagebk;
		$scope.loadDataBuku();
	};	
})
