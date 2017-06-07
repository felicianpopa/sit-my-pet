app.config(function($routeProvider) {
	$routeProvider
	.when('/requests', {
		templateUrl: '/templates/requests.html'
	})
	.when('/offers', {
		templateUrl: '/templates/offers.html'
	})
	.otherwise({
		templateUrl: '/templates/homepage.html'
	})
});