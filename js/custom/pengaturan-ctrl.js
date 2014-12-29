app.controller('PengaturanPetugasCtrl', function($scope, $http){
	if ( ! $scope.checkUser()) $scope.disconnect();
		
	$scope.dbAp=[];
	$scope.dbPr=[];
	$scope.dbPt=[];
	$scope.loadDataAp=function(){
		$http({
			url: $scope.server+'/admin/pengaturan?id='+$scope.user.id, method:'GET'
		}).
		success(function(d){
			$scope.dbAp=d.data;
			$scope.dbPr=d.datapr;
			$scope.dbPt=d.datapt;
			$scope.dbAd=d.dataad;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataAp(); //panggil fungsi
	
	$scope.ap=null;
	$scope.ap = {};	
	$scope.pr = {};	
	$scope.pt = {};	
	
	$scope.resetAp= function(){
		$scope.ap={
			kode:'', jumlah:'', denda:'', lama:''
		};
	};	
	$scope.resetAp();
	
	$scope.resetPr= function(){
		$scope.pr={
			kodepr:'', namapr:''
		};
	};	
	$scope.resetPr();
		
	$scope.resetPt= function(){
		$scope.pt={
			idp:'', nama:'', jk:'', telp:'', un:'', pw:''
		};
	};	
	$scope.resetPt();

	$scope.resetAd= function(){
		$scope.ad={
			idad:'', nama:'', jk:'', telp:'', un:''
		};
	};	
	$scope.resetPt();

	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.resetAp();
		$scope.resetPr();
		$scope.resetAd();
	};
	
	$scope.setEdit=function(i){
		$scope.ap=$scope.dbAp[i];
		$scope.editing = true;
	}
	
	$scope.setEditPr=function(i){
		$scope.pr=$scope.dbPr[i];
		$scope.editing = true;
	}
	
	$scope.setEditPt=function(i){
		$scope.pt=$scope.dbPt[i];
		$scope.editing = true;
	}
	
	$scope.setEditAd=function(i){
		$scope.ad=$scope.dbAd[i];
		$scope.editing = true;
	}
		
});