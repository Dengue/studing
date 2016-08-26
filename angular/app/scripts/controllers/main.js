
reposApp.controller("myController", function($scope, Repository,ReposDet) {
			$scope.do = function() {
				$scope.items = Repository.get(
				{search: $scope.name,
				 forks: $scope.forks,
				 stars: $scope.stars,
				 size: $scope.size	
				});
 			};
 			$scope.click = function(item){
 				ReposDet.setDetails(item);
 			};
})




reposApp.controller('detController',function($scope,ReposDet){
	console.log(ReposDet.item);
	$scope.item = ReposDet.item;
})