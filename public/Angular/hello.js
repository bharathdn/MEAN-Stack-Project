(function(){
	
	angular.module("WhiteBoardApp",[]);
	
	angular
		.module("WhiteBoardApp") //read operation
		.controller("HelloWorldController",HelloWorldController);
	
	function HelloWorldController($scope)
	{
		$scope.removeCourse = function(courseInstance)
		{
			//console.log("Remove");
			//console.log(courseInstance);
			var index = $scope.courses.indexOf(courseInstance);
			//console.log(index);
			$scope.courses.splice(index,1);
		}
		
		$scope.hello ="Injected data into the variable HEllo!"
		console.log("Hello from controller");	
		
		$scope.courseName = "Java 102";
		
		$scope.user = {
			fName: "Alice",
			lName: "Wonderland"
		};
		
		
		var course = { title: "Java 101",seats: 25,starts: new Date()};
		
		var courses = [course,
		{title: "PHP 101", seats:244, starts: new Date(2016,1,15)},
		{title: "MR 101", seats:255, starts: new Date(2015,12,5)}
		];
		
		$scope.courses = courses;
	}
	
})();