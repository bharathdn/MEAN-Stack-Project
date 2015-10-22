(function(){
	
	angular
		.module("coursesApp")
		.factory("courseService",courseService);
		
		function courseService(){

			var courses = [
			{title:"Java 101" , seats:24 , start: new Date()},
			{title:"C# 101" , seats: 35 , start:new Date(2016,8,17)},
			{title:"Angular" , seats: 78 , start:new Date(2016,7,26)},
			{title:"Node JS" , seats: 78 , start:new Date(2016,7,26)},
			{title:"C++" , seats: 78 , start:new Date(2016,7,26)},
			{title:"Ruby" , seats: 78 , start:new Date(2016,7,26)}
			];
			var service = {
				getAllCourses: getAllCourses
			};			
			return service;
			
			function getAllCourses(){
				return courses;
			}
		}
	
})();