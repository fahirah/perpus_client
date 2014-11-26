/*anggota controller */
app.controller('PetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	$scope.cpage = 0;
	$scope.numpage = 0;
	
	//load data anggota
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/admin/anggota?cpage='+$scope.cpage, method:'GET'
		}).
		success(function(d){
			$scope.db=d.data;
			$scope.numpage = d.numpage;
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
	
	
	
	//load data buku
	$scope.dbBuku=[];
	$scope.loadDataBuku=function(){
		$http({
			url: $scope.server+'/admin/buku', method:'GET'
		}).
		success(function(d){
			$scope.dbBuku=d;
		});
	};
	$scope.loadDataBuku(); //panggil fungsi
	
	$scope.buku = {};
	
	$scope.resetBuku= function(){
		$scope.buku={
			id:'', kode:'', judul:'', pengarang:'', stok:'', macam:'', bahasa:'', penempatan:'', penerbit:'', tahun:''
		};
	};
	$scope.resetAnggota();
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetAnggota();
	};
	
	
	$scope.setEdit=function(i){
		$scope.buku=$scope.dbBuku[i];
		$scope.editing = true;
	}
	
	/*pagination */
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
			$scope.cpage;
		$scope.loadData();
	};
		
})
