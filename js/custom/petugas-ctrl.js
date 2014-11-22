/*anggota controller */
app.controller('PetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	//load data anggota
	$scope.db=[];
	$scope.loadData=function(){
		$http({
			url: $scope.server+'/admin/anggota', method:'GET'
		}).
		success(function(d){
			$scope.db=d;
		});
	};
	$scope.loadData(); //panggil fungsi
	
	//$scope.prodi[];
	
	$scope.anggota = {
		nama:'',identitas:'',alamat:'', telp:'', gender:'Laki-Laki', status:'mahasiswa', prodi:'ti'
	};
	
	$scope.resetAnggota= function(){
		$scope.anggota={
			nama:'',identitas:'',alamat:'', telp:'', gender:'Laki-Laki', status:'mahasiswa', prodi:'ti'
		};
	};
	$scope.resetAnggota();
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetAnggota();
	};
	
})