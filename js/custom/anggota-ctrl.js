/*anggota controller */
app.controller('BukuAnggotaCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	//load data buku
	$scope.cpagebk = 0;
	$scope.numpagebk = 0;
	$scope.search={
		kata:'',jenis:''
	};
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/user/buku?cpagebk='+$scope.cpagebk+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
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
	
	$scope.batal = function(){
		$scope.detail=false;
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
			$scope.cpagebk++;
		$scope.loadData();
	};	
});

/*file controller */
app.controller('FileAnggotaCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	//load data file
	$scope.cpagefl = 0;
	$scope.numpagefl = 0;
	$scope.search={
		kata:'',jenis:''
	};
	
	$scope.db=[];
	$scope.loadDataFile=function(){
		$http({
			url: $scope.server+'/user/file?cpagefl='+$scope.cpagefl+'&kata='+$scope.search.kata+'&jenis='+$scope.search.jenis, method:'GET'
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
	$scope.loadDataFile(); //panggil fungsi
	
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
		$scope.berkas=$scope.db[i];
		$scope.editing = true;
	}
	
	$scope.batal = function(){
		$scope.editing = false;
		$scope.detail = false;
		$scope.resetBerkas();
	};
	
	$scope.detail = false;
	$scope.dataDetail = [];
	$scope.tampilDetail = function(i) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/detailfile/'+i, method:'GET'
		}).
		success(function(d){
			$scope.dataDetail=d.data;
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

/*peminjaman anggota controller */
app.controller('PeminjamanAnggotaCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	//load data peminjaman
	
	$scope.dbPjm=[];
	$scope.loadDataPjm=function(){
		$http({
			url: $scope.server+'/user/peminjaman/'+$scope.user.id, method:'GET'
		}).
		success(function(d){
			$scope.dbPjm=d;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Anda tidak punya tanggungan pinjaman buku. . .');
		});
	};
	$scope.loadDataPjm(); //panggil fungsi
	
});

app.controller('PengaturanAnggotaCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
		
	$scope.dbPt=[];
	$scope.loadDataAp=function(){
		$http({
			url: $scope.server+'/user/pengaturan?id='+$scope.user.id, method:'GET'
		}).
		success(function(d){
			$scope.dbPt=d.datapt;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataAp(); //panggil fungsi
	
	$scope.resetPt= function(){
		$scope.pt={
			idp:'', nama:'', jk:'', telp:'', un:'', pw:''
		};
	};	
	$scope.resetPt();
	
	$scope.batal = function(){
		$scope.resetPt();
	};
	
	$scope.pt = {};	
		
});


/*beranda anggota controller */
app.controller('BerandaAnggotaCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	//load data
	$scope.dbBukuBr=[];
	$scope.dbFileBr=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/user/beranda', method:'GET'
		}).
		success(function(d){
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

