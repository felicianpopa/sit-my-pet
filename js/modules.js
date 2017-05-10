var app = angular.module('mainModule', []);


app.service('sumNumbersService', function(){
	this.sumNumbers = function(number1, number2) {
		var number1 = parseFloat(number1);
		var number2 = parseFloat(number2);
		var result = number1 + number2;
		if(result) {
			return result
		}
		else {
			return 'va rugam sa completati toate input-urile'
		}
	}
});

app.controller('mainCtrl', ['$scope', 'sumNumbersService', function($scope, sumNumbersService){
	$scope.sumNr = function(n1,n2) {
		return sumNumbersService.sumNumbers(n1,n2);
	}
}]);