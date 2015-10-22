(function(){
	angular
	.module("coursesApp")
	.config(routePages);
	
	
	function routePages($routeProvider)
	{
		$routeProvider
		.when("/home",
		{ templateUrl: "home.html"})
		.when("/login",
		{templateUrl: "login.view.html"})
		.when("/logout",
		{templateUrl: "logout.html"})
		.when("/register",
		{templateUrl: "register.view.html"})
		.when("/courselist",
		{templateUrl: "courselist.html",
		controller: "courseController"})
		.when("/editcourse/:courseIndex",
		{templateUrl: "courseedit.html",
		controller: "courseEditController"})
		.otherwise(
		{redirectTo: "/home"});
	}
})();