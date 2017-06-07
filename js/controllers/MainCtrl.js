app.controller('mainCtrl', ['$scope', '$location',  function($scope, $location){
	$scope.windowLoaded = function() {
		console.log('window loaded');
	}
	$scope.isActive = function(viewLocation){
		return  viewLocation === $location.path();
	}
}]);