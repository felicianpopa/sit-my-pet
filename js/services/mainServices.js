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