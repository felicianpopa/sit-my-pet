// Load/save the main data.
app.service('mainDataService',['$ocModal', '$http', function($ocModal, $http){
	this.loadMainData = function() {
		return $http.get('/JSON/mainData.json').then(function (response){
			return response;
		});
	}
	this.saveMainData = function(dataToSave, scope) {
		$http.post('saveJson.php', dataToSave).then(function(data) {
			$ocModal.open({
				url: 'templates/alertBox.html',
				controller: 'mainCtrl',
				init: {
					alertText: 'data saved',
					alertType: 'text-success'
				}
			});
	    });
	}
}]);

app.service('processUserData',['mainDataService', '$ocModal',
	function(mainDataService, $ocModal){
	this.addNewUser = function(newUser, $scope) {
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
			mainDataService.saveMainData($scope.mainData, $scope);
		}
		else{
			$scope.formNotValid = true;
		}
	}
	this.logIn = function($scope) {
		var userFound = false;
		var passwordCorrect = false;
		if(angular.equals($scope.mainData.usersList, {})) {
			$ocModal.open({
				url: 'templates/alertBox.html',
				controller: 'mainCtrl',
				init: {
					alertText: 'There are no users in the database',
					alertType: 'text-danger'
				}
			});
			$ocModal.close();
		}
		else {
			for(var key in $scope.mainData.usersList) {
				if ($scope.mainData.usersList[key].userName == jQuery('input[name="userName"]').val()){
					userFound = true

					if ($scope.mainData.usersList[key].userPassword == jQuery('input[name="userPassword"]').val()) {
						passwordCorrect = true
					}
				}
			}
			if(userFound) {
				if(passwordCorrect) {
					$ocModal.close();
					$scope.mainData.user.loggedIn = true;
					$scope.mainData.user.loggedInUserName = jQuery('input[name="userName"]').val();
					mainDataService.saveMainData($scope.mainData, $scope);
				}
				else {
					$ocModal.open({
						url: 'templates/alertBox.html',
						controller: 'mainCtrl',
						init: {
							alertText: 'The password is incorrect',
							alertType: 'text-danger'
						}
					});
				}
			}
			else {
				$ocModal.open({
					url: 'templates/alertBox.html',
					controller: 'mainCtrl',
					init: {
						alertText: 'This user does not exist',
						alertType: 'text-danger'
					}
				});
			}
		}
	}
	this.logOut = function($scope) {
		$scope.mainData.user.loggedIn = false;
		$scope.mainData.user.loggedInUserName = null;
		mainDataService.saveMainData($scope.mainData, $scope);
	}
}]);