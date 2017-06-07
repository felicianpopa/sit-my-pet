app.controller('mainCtrl', ['$scope', '$location',  function($scope, $location){
	$scope.location = $location;

  	$scope.$watch('location.url()', getTitle);

  	function getTitle() {
	    $scope.pageTitle = $location.url().substring(1);
  	};
	$scope.windowLoaded = function() {
		console.log('window loaded');
	}
	$scope.isActive = function(viewLocation){
		return  viewLocation === $location.path();
	}

	$scope.getRating = function (ratingNumber) {
		return new Array(ratingNumber);
	}
}]);