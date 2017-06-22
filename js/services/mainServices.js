// Load/save the main data.
app.service('mainDataService', function($http){
	this.loadMainData = function() {
		return $http.get('/JSON/mainData.json').then(function (response){
			return response;
		});
	}
	this.saveMainData = function(dataToSave) {
		$http.post('saveJson.php', dataToSave).then(function(data) {
	      	alert('Data saved')
	    });
	}
});

app.service('processUserData',['mainDataService', '$ocModal', function(mainDataService, $ocModal){
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
			alert('nu exista nici un user');
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
					mainDataService.saveMainData($scope.mainData);
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
	this.logOut = function($scope) {
		$scope.mainData.user.loggedIn = false;
		$scope.mainData.user.loggedInUserName = null;
		mainDataService.saveMainData($scope.mainData);
	}
}]);