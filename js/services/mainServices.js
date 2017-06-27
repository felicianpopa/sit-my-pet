// Load/save the main data.
app.service('mainDataService',['$http', 'messageService', function($http, messageService){
	this.loadMainData = function() {
		return $http.get('/JSON/mainData.json').then(function (response){
			return response;
		});
	}
	this.saveMainData = function(dataToSave) {
		$http.post('saveJson.php', dataToSave).then(function(data) {
			messageService.setMessage('success', 'Data saved', 2000);
	    });
	}
}]);

app.service('processUserData',['mainDataService', '$ocModal', 'messageService',
	function(mainDataService, $ocModal, messageService){
	this.addNewUser = function(newUser, $scope) {
		if($scope.newUser.userPassword !== $scope.newUser.confirmUserPassword) {
			$scope.newUserForm.$valid = false;
			messageService.setMessage('danger', 'The passwords do not match', 2000);
			$scope.newUser.userPassword = null;
			$scope.newUser.confirmUserPassword = null;

		}
		if($scope.newUserForm.$valid) {
			$scope.formNotValid = false;
			var newUserName = $scope.newUser.userName
			$scope.mainData.usersList[newUserName] = newUser;
			mainDataService.saveMainData($scope.mainData);
		}
		else{
			$scope.formNotValid = true;
		}
	}
	this.logIn = function($scope) {
		var userFound = false;
		var passwordCorrect = false;
		if(angular.equals($scope.mainData.usersList, {})) {
			messageService.setMessage('danger', 'There are no users in the database', 2000);
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
					// If all is good we close the modal.
					// We update the scopes and save the data from the modal's onClose function callback.
					$ocModal.close();

				}
				else {
					messageService.setMessage('danger', 'The password is incorrect', 2000);
				}
			}
			else {
				messageService.setMessage('danger', 'The user does not exist', 2000);
			}
		}
	}
	this.logOut = function($scope) {
		$scope.mainData.user.loggedIn = false;
		$scope.mainData.user.loggedInUserName = null;
		mainDataService.saveMainData($scope.mainData);
	}
}]);