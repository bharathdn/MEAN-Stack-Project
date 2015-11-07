(function(){
	angular
	.module("myApp",["ngRoute"])
	.config(pageRouter);
	
	function pageRouter($routeProvider){
		$routeProvider
		.when("/page1",
		{ templateUrl: "page1.html",
		controller: "p1controller" })
		.when("/page2",
		{ templateUrl: "page2.html" })
		.otherwise(
		{templateUrl: "page3.html"
		});
	}
})();