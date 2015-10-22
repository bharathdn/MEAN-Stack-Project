(function(){
	
	angular
		.module("coursesApp")
		.controller("mainController", mainController);
	
	function mainController($scope,$location){ 
		// this sets the location to location variable 
		$scope.$location = $location;
	}
})();