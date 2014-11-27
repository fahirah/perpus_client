'use strict';

/* simpan anggota */
app.directive('simpanAnggota', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.anggota.nama.length < 4) return alertify.error('Nama anggota tidak boleh kosong');
			if($scope.anggota.identitas.length < 4) return alertify.error('No identitaas tidak boleh kosong');
			if($scope.anggota.alamat.length < 4) return alertify.error('Alamat anggota tidak boleh kosong');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/anggota', method: 'POST', data:$scope.anggota }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data anggota berhasil disimpan');
				$scope.batal();
				$scope.db=d.data;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);

/*hapus anggota */
app.directive('hapusAnggota', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/anggota/'+attrs.hapusAnggota, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data anggota berhasil dihapus');
						$scope.loadData();
					});
				}
			});
		});
	}
}]);

/* simpan buku */
app.directive('simpanBuku', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/buku', method: 'POST', data:$scope.buku }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data buku berhasil disimpan');
				$scope.batal();
				$scope.dbBuku=d;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);

/*hapus buku */
app.directive('hapusBuku', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/buku/'+attrs.hapusBuku, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data buku berhasil dihapus');
						$scope.loadDataBuku();
					});
				}
			});
		});
	}
}]);