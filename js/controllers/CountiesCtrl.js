app.controller('countiesCtrl',['$scope', '$http', function($scope, $http){
	$http.get("/JSON/counties.json").then(function (response) {
		$scope.countiesData = response.data.counties;
		$scope.counties = [];
		angular.forEach($scope.countiesData, function(value, key){
			$scope.counties.push(key)
		});
    });
    $scope.updateCities = function() {
    	console.log($scope.countiesData);
    	$scope.cities = $scope.countiesData[$scope.selectedCounty];
    }
}]);