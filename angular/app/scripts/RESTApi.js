angular.module("RESTApi", ["ngResource"]);

angular.module("RESTApi").factory("Repository", function($resource) {
	return $resource("https://api.github.com/search/repositories?q=:search&+forks:>=:forks+stars:>=:stars+size");
})