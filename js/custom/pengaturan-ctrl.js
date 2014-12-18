app.controller('PengaturanPetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
		
	$scope.dbAp=[];
	$scope.loadDataAp=function(){
		$http({
			url: $scope.server+'/admin/pengaturan', method:'GET'
		}).
		success(function(d){
			$scope.dbAp=d;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataAp(); //panggil fungsi
	
	$scope.ap=null;
	$scope.ap = {};	
	
	$scope.resetAp= function(){
		$scope.ap={
			kode:'', jumlah:'', denda:'', lama:''
		};
	};	
	$scope.resetAp();

	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetAp();
	};
	
	$scope.setEdit=function(i){
		$scope.ap=$scope.dbAp[i];
		$scope.editing = true;
	}
		
});