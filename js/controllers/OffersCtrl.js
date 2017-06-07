app.controller('offersCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('/JSON/caregivers.json').then(function (response){
		$scope.caregivers = response.data.caregivers;
	});
}])