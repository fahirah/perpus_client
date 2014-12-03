'use strict';

/* simpan anggota */
app.directive('simpanAnggota', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.anggota.nama.length < 3) return alertify.error('Nama anggota tidak boleh kosong');
			if($scope.anggota.identitas.length < 5) return alertify.error('No identitaas tidak boleh kosong');
			if($scope.anggota.alamat.length < 4) return alertify.error('Alamat anggota tidak boleh kosong');
			if($scope.anggota.telp.length < 5) return alertify.error('Telp anggota tidak boleh kosong');
			
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
			if($scope.buku.kode.length < 4) return alertify.error('Kode buku tidak boleh kosong');
			if($scope.buku.judul.length < 4) return alertify.error('Judul buku tidak boleh kosong');
			if($scope.buku.pengarang.length < 3) return alertify.error('Pengarang buku tidak boleh kosong');
			if($scope.buku.stok.length < 1) return alertify.error('Stok buku tidak boleh kosong');
			if($scope.buku.macam.length < 0 || $scope.buku.macam==null) return alertify.error('Macam buku tidak boleh kosong');
			if($scope.buku.bahasa.length < 0 || $scope.buku.bahasa==null) return alertify.error('Bahasa buku tidak boleh kosong');
			if($scope.buku.penempatan.length < 3) return alertify.error('No penempatan buku tidak boleh kosong');
			if($scope.buku.penerbit.length < 3) return alertify.error('Penerbit buku tidak boleh kosong');
			if($scope.buku.tahun.length < 4) return alertify.error('Tahun terbit buku tidak boleh kosong');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/buku', method: 'POST', data:$scope.buku }).
			success(function(d){
				elm.button('reset');
				if (d == 'false') return alertify.error('Kode buku sudah ada!');
				alertify.success('Data buku berhasil disimpan');
				$scope.batal();
				$scope.dbBuku=d.data;
				$scope.numpagebk=d.numpagebk;
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

/* File input */
app.directive('simpanFile', function(){
	return function($scope, elm) {
		elm.on('click', function(e){
			var fd = new FormData();
			//fd.append("file", e.target.files[0]);
			fd.append('file', $scope.file);
			fd.append('id', $scope.berkas.id);
			fd.append("judul", $scope.berkas.judul);
			fd.append("pengarang", $scope.berkas.pengarang);
			fd.append("macam", $scope.berkas.macam);
			fd.append("bahasa", $scope.berkas.bahasa);
			fd.append("penerbit", $scope.berkas.penerbit);
			fd.append("tahun", $scope.berkas.tahun);
			fd.append("ringkasan", $scope.berkas.ringkasan);
			
			var xhr = new XMLHttpRequest();
			xhr.open('post', $scope.server +'/admin/file', true);
			xhr.onload = function(){
				var r = this.responseText;
				if(r == '500') return alertify.error('Data gagal diproses dan disimpan!');
				alertify.success('Data berhasil diproses dan disimpan');
				$scope.batal();
				$scope.loadDataFile();
				//console.log(r);
			};	
			xhr.send(fd);
			
		});
	}
});

/*hapus buku */
app.directive('hapusFile', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/file/'+attrs.hapusFile, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data file berhasil dihapus');
						$scope.loadDataFile();
					});
				}
			});
		});
	}
}]);