/*anggota controller */
app.controller('PetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	$scope.cpage = 0;
	$scope.numpage = 0;
	$scope.search={
		kata:'',jenis:''
	};
	
	
	//load data anggota
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/admin/anggota?cpage='+$scope.cpage +'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
		}).
		success(function(d){
			$scope.db=d.data;
			$scope.numpage = d.numpage;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadData(); //panggil fungsi
	
	$scope.prodi = [];
	$scope.loadProdi=function(){
		$http({
			url: $scope.server+'/prodi', method:'GET'
		}).
		success(function(d){
			$scope.prodi=d;
		});
	};
	$scope.loadProdi(); //panggil fungsi
	
	
	$scope.anggota = {};
	
	$scope.resetAnggota= function(){
		$scope.anggota={
			id:'', nama:'',identitas:'',alamat:'', telp:'', gender:'L', status:'m', prodi:''
		};
	};
	$scope.resetAnggota();
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetAnggota();
	};
	
	
	$scope.setEdit=function(i){
		$scope.anggota=$scope.db[i];
		$scope.editing = true;
	}
	
		
	/*pagination anggota*/
	$scope.jph=20;
	
	$scope.range = function(start, end){
		var r = [];
		if( ! end){
			end = start; start = 0;
		}
		for(var i = start; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPage = function(){
		$scope.cpage = this.n;
		$scope.loadData();
	};
	$scope.prevPage = function(){
		if($scope.cpage > 0 )
			$scope.cpage--;
		$scope.loadData();
	};
	$scope.nextPage = function(){
		if($scope.cpage < $scope.numpage -1)
			$scope.cpage++;
		$scope.loadData();
	};
		
});

/*beranda petugas controller */
app.controller('BerandaPetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	//load data
	$scope.db=[];
	$scope.dbBukuBr=[];
	$scope.dbFileBr=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/admin/beranda', method:'GET'
		}).
		success(function(d){
			$scope.jumanggota=d.jum_anggota;
			$scope.jumbuku=d.jum_buku;
			$scope.jumfile=d.jum_file;
			$scope.dipinjam=d.judul;
			$scope.diunduh=d.nama;
			$scope.dbBukuBr=d.bukubaru;
			$scope.dbFileBr=d.filebaru;
		});
	};
	$scope.loadData(); //panggil fungsi	

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
});
