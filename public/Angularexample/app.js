(function(){
	angular
		.module("myApp")
		.controller("myController",myController);
		
	function myController($scope){
		var details = [];
		$scope.details = details;
		 
		details.push({fname:"Hari", phone: "777-456-8765"});
		details.push({fname:"Sharukh", phone: "666-456-8765"});
	}		
})();