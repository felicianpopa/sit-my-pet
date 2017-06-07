app.config(function($routeProvider) {
	$routeProvider
	.when('/requests', {
		templateUrl: '/templates/requests.html',
		data: {
			pageTitle: "requests"
		}
	})
	.when('/offers', {
		templateUrl: '/templates/offers.html',
		data: {
			pageTitle: "offers"
		}
	})
	.when('/home', {
		templateUrl: '/templates/homepage.html',
		data: {
			pageTitle: "homepage"
		}
	})
	.otherwise({
		redirectTo: '/home'
	})
});

app.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.$$route.data.pageTitle
    });
}]);