/*home untuk anggota controller */
app.controller('AnggotaCtrl', function($scope, $http) {
	if ( ! $scope.checkUser()) $scope.disconnect();
	
});
