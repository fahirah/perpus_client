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
	$scope.file=null;
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
			id:'', sampul:'', kode:'',isbn:'', judul:'', pengarang:'', stok:'', sisa:'', macam:'', bahasa:'', penempatan:'', penerbit:'', tahun:''
		};
	};
	$scope.resetBuku();
	
	$scope.detail = false;
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.detail=false;
		$scope.resetBuku();
	};
	
	$scope.dataDetail = [];
	$scope.dataPinjam=[];
	$scope.tampilDetail = function(i) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/detailbuku/'+i, method:'GET'
		}).
		success(function(d){
			$scope.dataDetail=d.data;
			$scope.dataPinjam=d.datapjm;
		});
	}
	
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
			$scope.cpagebk++;
		$scope.loadDataBuku();
	};	
})
