/*peminjaman controller */
app.controller('PeminjamanPetugasCtrl', function($scope, $http) {
	if ( ! $scope.checkUser()) $scope.disconnect();
	
	//load data peminjaman
	$scope.cpagepjm = 0;
	$scope.numpagepjm = 0;
	$scope.kata='';
	$scope.jumpjm=0;
	$scope.search={
		tipe: '',status:'',tgl:'',noid:'', bulan:'', kd:'', jd:'', tahun:''
	};
	$scope.pjm={
		anggota:'',buku:''
	}
	
	$scope.changeType = function() {
		switch($scope.search.tipe) {
			case 'status':
				$scope.search.tgl = $scope.search.noid = $scope.search.bulan = $scope.search.kd = $scope.search.jd = '';
				break;
			case 'tanggal':
				$scope.search.status = $scope.search.noid = $scope.search.bulan = $scope.search.kd = $scope.search.jd = '';
				break;
			case 'bulanan':
				$scope.search.status = $scope.search.noid = $scope.search.tgl =  $scope.search.kd = $scope.search.jd = '';
				break;
			case 'noid':
				$scope.search.status = $scope.search.bulan = $scope.search.tgl =  $scope.search.kd = $scope.search.jd = '';
				break;
			case 'kdbuku':
				$scope.search.status = $scope.search.bulan = $scope.search.tgl =  $scope.search.noid = $scope.search.jd = '';
				break;
			case 'jdbuku':
				$scope.search.status = $scope.search.bulan = $scope.search.tgl =  $scope.search.noid = $scope.search.kd = '';
				break;
		}
	};
	
	$scope.dbPjm=[];
	$scope.loadDataPjm=function(){
		$http({
			url: $scope.server+'/admin/peminjaman?cpagepjm='+$scope.cpagepjm+'&status='+$scope.search.status+'&tgl='+$scope.search.tgl+'&noid='+$scope.search.noid+'&bulan='+$scope.search.bulan+'&kdbuku='+$scope.search.kd+'&jdbuku='+$scope.search.jd, method:'GET'
		}).
		success(function(d){
			$scope.dbPjm=d.data;
			$scope.jumpjm=d.jumlah;
			$scope.numpagepjm=d.numpagepjm;
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Data yang anda cari tidak ditemukan');
		});
	};
	$scope.loadDataPjm(); //panggil fungsi
	
	//kas
	$scope.cpagekas = 0;
	$scope.numpagekas = 0;
	$scope.total = 0;
	$scope.jumlah = 0;
	
	$scope.cari={
		pil: '',tgl:'', bulan:'', tahun:''
	};
	
	$scope.changePil = function() {
		switch($scope.cari.pil) {
			case 'tanggal':
				$scope.cari.bulan = $scope.cari.tahun = '';
				break;
			case 'bulanan':
				$scope.cari.tgl = $scope.cari.tahun = '';
				break;
			case 'tahunan':
				$scope.cari.tgl = $scope.cari.bulan = '';
				break;
		}
	};
	
	$scope.dbKas=[];
	$scope.loadDataKas=function(){
		$http({
			url: $scope.server+'/admin/peminjaman/kas?cpagekas='+$scope.cpagekas+'&tgl='+$scope.cari.tgl+'&tahun='+$scope.cari.tahun+'&bulan='+$scope.cari.bulan, method:'GET'
		}).
		success(function(d){
			$scope.dbKas=d.data;
			$scope.total=d.total;
		//	$scope.jumlah=d.jumlah;
			$scope.numpagekas=d.numpagekas;
		});
	};
	$scope.loadDataKas(); //panggil fungsi
	
	/*$scope.setEdit=function(i){
		$scope.pjm=$scope.dbPjm[i];
		$scope.editing = true;
	}*/
	
	$scope.dataPinjam = [];
	$scope.tambahPinjam=function(){
		$http({
			url: $scope.server+'/cekanggota/'+$scope.pjm.anggota, method:'GET'
		}).
		success(function(d){
			$http({
				url: $scope.server+'/cekjumlah/'+$scope.pjm.anggota+'/'+$scope.dataPinjam.length, method:'GET'
			}).
			success(function(d){
				$http({
					url: $scope.server+'/cekbuku/'+$scope.pjm.buku+'/'+$scope.pjm.anggota, method:'GET'
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
			}).
			error(function(e, s, h){
				//kalau error
				alertify.error('Jumlah Peminjaman sudah maksimal');
				$scope.pjm.buku='';
			});
		}).
		error(function(e, s, h){
			//kalau error
			alertify.error('Id anggota yang anda cari tidak ditemukan atau jumlah peminjaman sudah maksimal');
			$scope.pjm.anggota='';
			$scope.pjm.buku='';
		});
	}
	$scope.loadDataPjm();
	
	function removeByIndex(arr, index) {
		arr.splice(index, 1);
	}

	$scope.setHapus=function(i){
		removeByIndex($scope.dataPinjam, i);
	}
	
	$scope.resetPjm= function(){
		$scope.pjm={
			anggota:'', buku:'',
		};
		$scope.dataPinjam=[];
		$scope.editing=false;
	};	
	$scope.resetPjm();
	
	$scope.detail = false;
	$scope.editing = false;
	$scope.batal = function(){
		$scope.editing = false;
		$scope.detail=false;
		$scope.resetPjm();
	};
/*		
	$scope.bayarDenda = function(i,j) {
		$http({
			url: $scope.server+'/bayardenda/'+i+'/'+j, method:'GET'
		}).
		success(function(d){
			alertify.success('Bayar Denda berhasil disimpan');
			$scope.loadDataPjm();
		});
	}
*/	
	$scope.perpanjangPjm = function(i,j) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/perpanjangpjm/'+i+'/'+j, method:'GET'
		}).
		success(function(d){
			alertify.success('Perpanjangan buku berhasil disimpan');
			$scope.detail = false;
			$scope.loadDataPjm();
			$scope.loadDataKas();
		});
	}
	
	$scope.kembaliPjm = function(i,j) {
		$scope.detail = true;
		$http({
			url: $scope.server+'/kembalipjm/'+i+'/'+j, method:'GET'
		}).
		success(function(d){
			alertify.success('Buku dikembalikan berhasil disimpan');
			$scope.detail= false;
			$scope.loadDataPjm();
			$scope.loadDataKas();
			//$scope.tampilDetail(i);
		});
	}

	
	//pagination pjm
	$scope.jph=20;
	
	$scope.range = function(start, end){
		var r = [];
		if( ! end){
			end = start; start = 0;
		}
		for(var i = start; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagepjm = function(){
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
			$scope.cpagepjm++;
		$scope.loadDataPjm();
	};
	
	//pagination kas
	$scope.jph=20;
	
	$scope.range = function(start, end){
		var r = [];
		if( ! end){
			end = start; start = 0;
		}
		for(var i = start; i< end; i++) r.push(i);
		return r;
	};
	
	$scope.setPagekas = function(){
		$scope.cpagekas = this.n;
		$scope.loadDataKas();
	};
	$scope.prevPagekas = function(){
		if($scope.cpagekas > 0 )
			$scope.cpagekas--;
		$scope.loadDataKas();
	};
	$scope.nextPagekas = function(){
		if($scope.cpagekas < $scope.numpagekas -1)
			$scope.cpagekas++;
		$scope.loadDataKas();
	};
	
});
