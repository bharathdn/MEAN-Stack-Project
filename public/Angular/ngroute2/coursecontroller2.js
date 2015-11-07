(function(){
	angular
	.module("coursesApp")
	.controller("courseController",courseController);
	
	
	function courseController($scope, courseService)
	{
		//$scope.hello ="Hello from courseController";
		
		//$scope.courses = courses;
		$scope.courses = courseService.getAllCourses();
		
		$scope.removeCourse = removeCourse;
		
		function removeCourse($index){
		console.log("remove called on "+$index);
		//$scope.courses.splice($index,1);
		console.log(courseService.getAllCourses());
		
		courseService.getAllCourses().splice($index,1);
		}
	}
	
	
	
})();
