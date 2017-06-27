app.directive('message', function(){
	return {
		restrict: 'E',
		controller: 'messageCtrl',
		templateUrl: '/templates/messages.html'
	}
});

app.controller('messageCtrl', ['$scope','messageService', function($scope, messageService){
	$scope.returnMessage = function() {
		return messageService.message;
	}
}]);

app.service('messageService', ['$timeout', function($timeout){
	var self = this;
	this.message = {};
	this.setMessage = function(type, text, displayDuration) {
		this.message.type = 'bg-'+type;
		this.message.text = text;
		$timeout(function(){
			self.message = {};
		},displayDuration)
	};
}]);