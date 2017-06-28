app.controller('mainCtrl', ['$scope', '$location', '$http', '$ocModal', 'mainDataService', 'processUserData', 'messageService',
	function($scope, $location, $http, $ocModal, mainDataService, processUserData, messageService){
	$scope.windowLoaded = function() {
		console.log('window loaded');
	}
	$scope.isActive = function(viewLocation){
		return  viewLocation === $location.path();
	}

	$scope.getRating = function (ratingNumber) {
		return new Array(ratingNumber);
	}

	$scope.getPageTitle = function() {
		return $location.path().split('/')[1] || 'homepage';
	}

	$scope.openLoginModal = function() {
		$ocModal.open({
			url: 'templates/loginModal.html',
			controller: 'mainCtrl'
		});
	}

	$scope.addNewUser = function(newUserData) {
		processUserData.addNewUser(newUserData, $scope);
	}

	$scope.logIn = function() {
		processUserData.logIn($scope);
	}

	$scope.returnLoginData = function() {
		return processUserData.loginData
	}

	$scope.logOut = function() {
		processUserData.logOut($scope);
	}

	mainDataService.loadMainData().then(function(response){
        $scope.mainData = response.data
		processUserData.loginData = $scope.mainData.user
		$scope.returnLoginData();
	})
}]);