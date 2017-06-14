app.controller('mainCtrl', ['$scope', '$location', '$http', '$ocModal',  function($scope, $location, $http, $ocModal){
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
	$http.get('/JSON/mainData.json').then(function (response){
		$scope.mainData = response.data;
	});
	$scope.openLoginModal = function() {
		$ocModal.open({
			url: 'templates/loginModal.html',
			controller: 'mainCtrl'
		});
	}
	$scope.logOut = function() {
		$scope.mainData.user.loggedIn = false;
	}
	$scope.logIn = function() {
		for(var i=0; i<$scope.mainData.usersList.length; i++) {
			if ($scope.mainData.usersList[i].userName == jQuery('input[name="userName"]').val()){
				if ($scope.mainData.usersList[i].userPassword == jQuery('input[name="userPassword"]').val()) {
					$ocModal.close();
					$scope.mainData.user.loggedIn = true;
					return
				}
				else {
					alert('password is incorrect')
				}
			}
			else {
				alert('user is incorrect')
			}
		}
	}
	// Call the login function.
	jQuery(document).on('click', '#login', function(){
		$scope.logIn();
	});
}]);