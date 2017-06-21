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
		console.log('running')
		if(angular.equals($scope.mainData.usersList, {})) {
			alert('nu exista nici un user');
			$ocModal.close();
		}
		else {
			for(var key in $scope.mainData.usersList) {
				if ($scope.mainData.usersList[key].userName == jQuery('input[name="userName"]').val()){
					if ($scope.mainData.usersList[key].userPassword == jQuery('input[name="userPassword"]').val()) {
						$ocModal.close();
						$scope.mainData.user.loggedIn = true;
						$scope.mainData.user.loggedInUserName = jQuery('input[name="userName"]').val();
						saveMainData();
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
	}
	// Call the login function.
	jQuery(document).on('click', '#login', function(){
		$scope.logIn();
	});
	// Add a new user
	$scope.addNewUser = function(newUser) {
		if($scope.newUser.userPassword !== $scope.newUser.confirmUserPassword) {
			$scope.newUserForm.$valid = false;
			alert('parola confirmata nu este aceeasi cu parola, va ruga sa le recompletati');
			$scope.newUser.userPassword = null;
			$scope.newUser.confirmUserPassword = null;

		}
		if($scope.newUserForm.$valid) {
			$scope.formNotValid = false;
			var newUserName = $scope.newUser.userName
			$scope.mainData.usersList[newUserName] = newUser;
		 	saveMainData();
		}
		else{
			$scope.formNotValid = true;
		}
	}
	function saveMainData() {
		$http.post('saveJson.php', $scope.mainData).then(function(data) {
	      	alert('Data saved')
	    });
	}
}]);