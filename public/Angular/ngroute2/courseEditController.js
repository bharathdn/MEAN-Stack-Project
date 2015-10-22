(function(){
	
	angular
	.module("coursesApp")
	.controller("courseEditController",courseEditController);
	
	function courseEditController($scope, $routeParams){
		alert($routeParams.courseIndex);
	}
	
})();