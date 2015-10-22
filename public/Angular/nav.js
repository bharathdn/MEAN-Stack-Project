/*(function(){
	angular
		.module("routeApp", ["ngRoute"])
		.config(function($routeProvider){
		$routeProvider
		
		.when("/", {
			templateUrl: "nav.html"
		})
		.when("/profile", {
			templateUrl: "profile.html"
		})
		.when("/admin", {
			templateUrl: "admin.html"
		})
		.otherwise({
			redirectTo: "/"
		});			
	});	
})(); */
(function(){
    angular
        .module("routeApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "home.html"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();