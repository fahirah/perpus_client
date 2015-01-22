
'use strict';

/* simpan anggota */
app.directive('simpanAnggota', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.anggota.nama.length < 3) return alertify.error('Nama anggota tidak boleh kurang dari 3 karakter');
			if($scope.anggota.identitas.length < 5) return alertify.error('No identitaas tidak boleh kurang dari 5 karakter');
			if($scope.anggota.alamat.length < 4) return alertify.error('Alamat anggota tidak boleh kurang dari 4 karakter');
			if($scope.anggota.telp.length < 6) return alertify.error('Telp anggota tidak boleh kurang dari 6 karakter');
			if($scope.anggota.prodi.length == 0) return alertify.error('Prodi belum dipilih');
			
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

/*reset password anggota */
app.directive('resetAnggota', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin akan reset password?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/anggota/'+attrs.resetAnggota, method: 'POST' }).
					success(function(d){
						alertify.success('Password anggota berhasil direset');
						$scope.loadData();
					});
				}
			});
		});
	}
}]);

/* simpan buku */
app.directive('simpanBuku', function() {
	return function($scope, elm) {
		elm.click(function(e) {
			var fd=new FormData();
			//validasi
			//if($scope.buku.isbn.length < 10) return alertify.error('ISBN buku tidak boleh kurang dari 10 karakter');
			if($scope.buku.judul.length < 3) return alertify.error('Judul buku tidak boleh kurang dari 3 karakter');
			if($scope.buku.pengarang.length < 3) return alertify.error('Pengarang buku tidak boleh kurang dari 3 karakter');
			if($scope.buku.macam.length == 0) return alertify.error('Macam belum dipilih');
			if($scope.buku.bahasa.length == 0) return alertify.error('Bahasa belum dipilih');
			if($scope.buku.bahasa.length == 0) return alertify.error('Bahasa belum dipilih');
			if($scope.buku.klsutama.length == 0) return alertify.error('Kelas Utama belum dipilih');
			if($scope.buku.id==''){
				if($scope.buku.devisi.length ==0) return alertify.error('No Devisi klasifikasi buku belum dipilih');
			}
			if($scope.buku.kota.length < 3) return alertify.error('Kota terbit buku tidak boleh kurang dari 3 karakter');
			if($scope.buku.penerbit.length < 3) return alertify.error('Penerbit buku tidak boleh kurang dari 3 karakter');
			if($scope.buku.tahun.length < 4) return alertify.error('Tahun terbit buku tidak boleh kurang dari 4 karakter');
			if($scope.buku.ringkasan.length < 5) return alertify.error('Ringkasan file tidak boleh kurang dari 5 karakter');
			
			fd.append("id_user", $scope.user.id);
			fd.append("id",$scope.buku.id);
			fd.append("kode",$scope.buku.kode);
			fd.append("isbn",$scope.buku.isbn);
			fd.append('buku', $scope.file);
			fd.append("judul",$scope.buku.judul);
			fd.append("pengarang",$scope.buku.pengarang);
			fd.append("devisi",$scope.buku.devisi);
			fd.append("stok",$scope.buku.stok);
			fd.append("macam", $scope.buku.macam);
			fd.append("bahasa", $scope.buku.bahasa);
			fd.append("kota", $scope.buku.kota);
			fd.append("penerbit", $scope.buku.penerbit);
			fd.append("tahun", $scope.buku.tahun);
			fd.append("ringkasan", $scope.buku.ringkasan);
			fd.append("status", $scope.buku.status);
			
			var xhr = new XMLHttpRequest();
			xhr.open('post', $scope.server +'/admin/buku', true);
			
			xhr.onload = function(){
				var r = this.responseText;
				if(r == '500') return alertify.error('Data gagal diproses dan disimpan!');
				alertify.success('Data berhasil diproses dan disimpan');
				$scope.batal();
				$scope.loadDataBuku();
				
			};	
			xhr.send(fd);
			
		});
	}
});

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
			//validasi
			if($scope.berkas.id === null ){
				if($scope.file === null) return alertify.error('File Harus Dipilih');
			}
			if($scope.berkas.judul.length < 3) return alertify.error('Judul file tidak boleh kurang dari 3 karakter');
			if($scope.berkas.pengarang.length < 3) return alertify.error('Pengarang file tidak boleh kurang dari 3 karakter');
			if($scope.berkas.macam.length == 0) return alertify.error('Macam belum dipilih');
			if($scope.berkas.bahasa.length == 0) return alertify.error('Bahasa belum dipilih');
			if($scope.berkas.tahun.length < 4) return alertify.error('Tahun terbit file tidak boleh kurang dari 4 karakter');
			if($scope.berkas.ringkasan.length < 5) return alertify.error('Ringkasan file tidak boleh kurang dari 5 karakter');
						
			//fd.append("file", e.target.files[0]);
			fd.append("status", $scope.user.status);
			fd.append("id_user", $scope.user.id);
			fd.append("file1", $scope.file);
			fd.append("file2", $scope.file2);
			fd.append("id", $scope.berkas.id);
			fd.append("judul", $scope.berkas.judul);
			fd.append("pengarang", $scope.berkas.pengarang);
			fd.append("macam", $scope.berkas.macam);
			fd.append("bahasa", $scope.berkas.bahasa);
			fd.append("penerbit", $scope.berkas.penerbit);
			fd.append("tahun", $scope.berkas.tahun);
			fd.append("ringkasan", $scope.berkas.ringkasan);
			
			var xhr = new XMLHttpRequest();
			if(status==2){
				xhr.open('post', $scope.server +'/admin/file', true);
			}else{
				xhr.open('post', $scope.server +'/file', true);
			}
			xhr.onload = function(){
				var r = this.responseText;
				if(r == '500') return alertify.error('Data gagal diproses dan disimpan!');
				alertify.success('Data berhasil diproses dan disimpan');
				$scope.batal();
				if(status==2){
					$scope.loadDataFile();
				}else{
					$scope.loadDataFile();
				}
				//console.log(r);
			};	
			xhr.send(fd);
			
		});
	}
});

/*hapus file */
app.directive('hapusFile', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					if(status==2){
						$http({ url:$scope.server + '/admin/file/'+attrs.hapusFile, method: 'DELETE' }).
						success(function(d){
							alertify.success('Data file berhasil dihapus');
							$scope.loadDataFile();
						});
					}else{
						$http({ url:$scope.server + '/user/file/'+attrs.hapusFile, method: 'DELETE' }).
						success(function(d){
							alertify.success('Data file berhasil dihapus');
							$scope.loadDataFile();
						});
					}			
						
				}
			});
		});
	}
}]);

/* simpan peminjaman */
app.directive('simpanPjm', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.dataPinjam.length == 0) return alertify.error('Tidak ada data peminjaman');
			var data = { buku: [], anggota: $scope.pjm.anggota, idp: $scope.user.id }; // variabel sementara
			for (var i = 0; i < $scope.dataPinjam.length; i++) // cacah array buku
				data.buku.push($scope.dataPinjam[i].id); // ambil id nya
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/peminjaman', method: 'POST', data: data }).
			success(function(d){
				elm.button('reset');
				$scope.resetPjm();
				$scope.loadDataPjm();
				$scope.loadDataKas();
				alertify.success('Data peminjaman berhasil disimpan');				
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);


/*hapus peminjaman */
app.directive('hapusPjm', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/peminjaman/'+attrs.hapusPjm, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data peminjaman berhasil dihapus');
						$scope.loadDataPjm();
						$scope.loadDataKas();
					});
				}
			});
		});
	}
}]);

/*hapus kas */
app.directive('hapusKas', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/peminjaman/kas/'+attrs.hapusKas, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data denda berhasil dihapus');
						$scope.loadDataPjm();
						$scope.loadDataKas();
					});
				}
			});
		});
	}
}]);

/* update pengaturan */
app.directive('simpanAp', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			if($scope.dbAp.jumlah.length < 1) return alertify.error('Jumlah Maksimal Buku tidak boleh kurang dari 1 karakter');
			if($scope.dbAp.jumlah==0) return alertify.error('Jumlah Maksimal Buku Tidak Boleh 0');
			if($scope.dbAp.denda.length < 2) return alertify.error('Denda tidak boleh kurang dari 2 karakter');
			if($scope.dbAp.denda==0) return alertify.error('Denda Tidak Boleh 0');
			if($scope.dbAp.lama.length < 1) return alertify.error('Lama Pinjam Buku tidak boleh kurang dari 1 karakter');
			if($scope.dbAp.lama==0) return alertify.error('Lama Pinjam Buku Tidak Boleh 0');
		
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/pengaturan', method: 'POST', data:$scope.dbAp }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data pengaturan aplikasi berhasil disimpan');
				$scope.db=data;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);

/* simpan prodi */
app.directive('simpanProdi', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.pr.namapr.length < 3) return alertify.error('Nama prodi tidak boleh kurang dari 3 karakter');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/pengaturanprodi?id='+$scope.user.id, method: 'POST', data:$scope.pr }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data prodi berhasil disimpan');
				$scope.batal();
				$scope.dbPr=d.datapr;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);

/* simpan kelas utama ddc */
app.directive('simpanKelasutama', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.ddc.kode.length < 3) return alertify.error('Kode Klasifikasi Kelas Utama tidak boleh kurang dari 3');
			if($scope.ddc.ket.length < 3) return alertify.error('Keterangan Klasifikasi Kelas Utama tidak boleh kurang dari 3');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/pengaturankelasut?id='+$scope.user.id, method: 'POST', data:$scope.ddc }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data Klasifikasi Kelas Utama berhasil disimpan');
				$scope.batal();
				$scope.dbDdc=d.dataddc;
			}).
			error(function(e, s, h) {
				elm.button('reset'); 
				alertify.success('Data Klasifikasi Kelas Utama gagal disimpan');
				$scope.batal();
				//$scope.dbDdc=d.dataddc;
				$scope.setdbDdc(d.dataddc);
			});
		});
	}
}]);

/*hapus kelasutama */
app.directive('hapusDdc', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/pengaturankelasut/'+attrs.hapusDdc, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data Klasifikasi Kelas Utama berhasil dihapus');
						$scope.batal();
						$scope.setdbDdc(d.dataddc);
						//$scope.dbDdc=d.dataddc;
					});
				}
			});
		});
	}
}]);

/* simpan devisi ddc */
app.directive('simpanDevisi', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			//validasi
			if($scope.dev.klsutama.length == 0) return alertify.error('Kelas Utama Klasifikasi Belum Dipilih');
			if($scope.dev.kodedev.length < 3) return alertify.error('Kode Klasifikasi Kelas Utama tidak boleh kurang dari 3');
			if($scope.dev.ketdev.length < 3) return alertify.error('Keterangan Klasifikasi Kelas Utama tidak boleh kurang dari 3');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/pengaturandevisi?id='+$scope.user.id, method: 'POST', data:$scope.dev }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data Klasifikasi Kelas Utama berhasil disimpan');
				$scope.batal();
				$scope.dbDdc=d.dataddc;
			}).
			error(function(e, s, h) {
				elm.button('reset'); 
				alertify.success('Data Klasifikasi Kelas Utama gagal disimpan');
				$scope.batal();
				$scope.dbDdc=d.dataddc;
			});
		});
	}
}]);

/*hapus devisi */
app.directive('hapusDev', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/pengaturandevisi/'+attrs.hapusDev, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data Klasifikasi Devisi berhasil dihapus');
						$scope.batal();
						//$scope.setdbDdc(d.dataddc);
						$scope.dbDdc=d.dataddc;
					});
				}
			});
		});
	}
}]);

/*hapus prodi */
app.directive('hapusProdi', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/pengaturanprodi/'+attrs.hapusProdi, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data prodi berhasil dihapus');
						$scope.batal();
						$scope.setdbPr(d.datapr);
					});
				}
			});
		});
	}
}]);


/* simpan akun */
app.directive('simpanAkun', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			if($scope.dbPt.nama.length < 3) return alertify.error('Nama  tidak boleh kurang dari 3 karakter');
			if($scope.dbPt.telp.length < 6) return alertify.error('Telp  tidak boleh kurang dari 6 karakter');
			if($scope.dbPt.un.length < 5) return alertify.error('Username tidak boleh kurang dari 5 karakter');
			if($scope.dbPt.pw !=''){
				if($scope.dbPt.pw.length < 5) return alertify.error('Password tidak boleh kurang dari 5 karakter');
				if($scope.dbPt.pw != $scope.dbPt.pw2){
					return alertify.error("password harus sama. . .");
				}
			}
			elm.button('loading');
			$http({ url:$scope.server + '/admin/pengaturanakun?id='+$scope.user.id, method: 'POST', data:$scope.dbPt }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data akun berhasil disimpan');
				$scope.batal();
				$scope.dbPt=d.datapt;
			}).
			error(function(e, s, h) { 
				elm.button('reset');
				alertify.error('Gagal Diubah, Gunakan Username yang lain. . .');
				$scope.batal();
				//$scope.dbPt=e.datapt;
			});
		});
	}
}]);

/* simpan petugas/admin */
app.directive('simpanAdmin', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
			if($scope.ad.nama.length < 3) return alertify.error('Nama Petugas tidak boleh kurang dari 3 karakter');
			if($scope.ad.telp.length < 6) return alertify.error('Telp Petugas tidak boleh kurang dari 6 karakter');
			if($scope.ad.un.length < 5) return alertify.error('Username Petugas tidak boleh kurang dari 5 karakter');
			
			elm.button('loading');
			$http({ url:$scope.server + '/admin/petugas?id='+$scope.user.id, method: 'POST', data:$scope.ad }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data petugas berhasil disimpan');
				$scope.batal();
				$scope.dbAd=d.dataad;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);

/*hapus petugas */
app.directive('hapusPetugas', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin data ini akan dihapus?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/petugas/'+attrs.hapusPetugas+'?id='+$scope.user.id, method: 'DELETE' }).
					success(function(d){
						alertify.success('Data petugas berhasil dihapus');
						$scope.batal();
						$scope.setdbAd(d.dataad);
					});
				}
			});
		});
	}
}]);

/*reset password petugas */
app.directive('resetPetugas', ['$http', function($http) {
	return function($scope, elm, attrs) {
		elm.click(function(e) {
			alertify.confirm('Yakin akan reset password?', function(e){
				if(e){
					$http({ url:$scope.server + '/admin/pengaturan/'+attrs.resetPetugas, method: 'POST' }).
					success(function(d){
						alertify.success('Password petugas berhasil direset');
						//$scope.setdbAd(d.dataad);
						$scope.dbAd=d.dataad;
					});
				}
			});
		});
	}
}]);

/* simpan akun anggota */
app.directive('simpanAkunanggota', ['$http', function($http) {
	return function($scope, elm) {
		elm.click(function(e) {
		
			if($scope.dbPt.nama.length < 3) return alertify.error('Nama tidak boleh kurang dari 3 karakter');
			if($scope.dbPt.alamat.length < 3) return alertify.error('Alamat tidak boleh kurang dari 3 karakter');
			if($scope.dbPt.telp.length < 6) return alertify.error('Telp  tidak boleh kurang dari 6 karakter');
			//if($scope.dbPt.un.length < 5) return alertify.error('Username tidak boleh kurang dari 5 karakter');
			if($scope.dbPt.pw!=''){
				if($scope.dbPt.pw.length < 5) return alertify.error('Password tidak boleh kurang dari 5 karakter');
				if($scope.dbPt.pw != $scope.dbPt.pw2){
					return alertify.error("password harus sama. . .");
				}
			}
			elm.button('loading');
			$http({ url:$scope.server + '/user/pengaturan?id='+$scope.user.id, method: 'POST', data:$scope.dbPt }).
			success(function(d){
				elm.button('reset');
				alertify.success('Data akun berhasil disimpan');
				$scope.batal();
				$scope.dbPt=d.datapt;
			}).
			error(function(e, s, h) { elm.button('reset'); });
		});
	}
}]);