app.controller('FilePetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
		
	//load data file
	$scope.cpagefl = 0;
	$scope.numpagefl = 0;
	$scope.search={
		kata:'',jenis:''
	};

	$scope.dbFile=[];
	$scope.loadDataFile=function(){
		$http({
			url: $scope.server+'/admin/file?cpagefl='+$scope.cpagefl+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
		}).
		success(function(d){
			$scope.dbFile=d.data;
			$scope.numpagefl=d.numpagefl;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataFile(); //panggil fungsi
	
	$scope.file=null;
	$scope.file2=null;
	$scope.berkas = {};	
	
	$scope.resetBerkas= function(){
		$scope.berkas={
			id:'',nama:'', judul:'',pengarang:'', macam:'', bahasa:'', penerbit:'', tahun:'', ringkasan:'', tgl:''
		};
	};	
	$scope.resetBerkas();

	$scope.detail = false;
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.detail = false;
		$scope.resetBerkas();
	};
	
	$scope.dataDetail = [];
	$scope.dataDownload=[];
	$scope.tampilDetail = function(i) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/detailfile/'+i, method:'GET'
		}).
		success(function(d){
			$scope.dataDetail=d.data;
			$scope.dataDownload=d.datadownload;
		});
	}
	
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
		$scope.loadDataFile();
	};
	$scope.prevPagefl = function(){
		if($scope.cpagefl > 0 )
			$scope.cpagefl--;
		$scope.loadDataFile();
	};
	$scope.nextPagefl = function(){
		if($scope.cpagefl < $scope.numpagefl -1)
			$scope.cpagefl++;
		$scope.loadDataFile();
	};		
	
});