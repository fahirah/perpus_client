'use strict';

/** tooltips **/
app.directive('tooltips', function() {
	return {
		restrict: 'CA',
		link: function($scope, elm, attrs) { 
			return attrs.$observe('title', function(v) {
				elm.tooltip({ placement: (attrs.placement || 'top') }); 
			});
		}
	}
});

//Input file
app.directive('inputFile',function(){
	return function($scope,elm){
		elm.on('change', function(e) { $scope.file = e.target.files[0]; });
	};
});

//Input file
app.directive('inputFile2',function(){
	return function($scope,elm){
		elm.on('change', function(e) { $scope.file2 = e.target.files[0]; });
	};
});

/**
 * Popover
 */
app.directive('popovers', function() {
	return {
		restrict: 'CA',
		link: function($scope, elm, attrs) {
			return attrs.$observe('content', function(v) {
				elm.popover({
					placement: attrs.placement || 'top',
					animation: false,
					trigger: 'hover',
					html: true,
				});
			});
		}
	}
});

/**
 * Input angka
 */
app.directive('numberInput', function() {
	return function($scope, elm) {
		elm.keypress(function(e) {
			var c = e.keyCode || e.charCode;
			switch (c) {
				case 8: case 9: case 27: case 44: case 13: return;
				case 65:
					if (e.ctrlKey === true) return;
			}
			if (c < 45 || c > 57) {
				e.preventDefault();
			}
		});
	}
});