reposApp.factory('ReposDet',function(){
	var details = {};
	details.item = '';
	details.setDetails = function(newDet){
		details.item = newDet;
	}
	return details;
})