var reposApp = angular.module('reposApp',['RESTApi','ngRoute']);


reposApp.config(function($routeProvider){
	$routeProvider.
		when('/',{
			templateUrl: 'templates/main.html',
        	controller: 'myController'
		}).
		when('/details',{
			templateUrl:'templates/repo.html'
		}).
		otherwise({
			redirectTo:'/'
		});
})

