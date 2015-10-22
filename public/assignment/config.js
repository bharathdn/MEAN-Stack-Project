(function(){
	angular
		.module("FormBuilderApp",["ngRoute"])
		.config(function($routeProvider){
			$routeProvider
				.when("/",{
					templateUrl: "index.html"
				})
				.when("/profile",{
					templateUrl: "profile/profile.html"
				})
				.when("/admin",{
					templateUrl: "admin/admin.html"
				})
				.when("/forms",{
					templateUrl: "forms/forms.html"
				})
				.when("/login",{
					templateUrl: "login/login.html"
				})
				.when("/register",{
					templateUrl: "register/register.html"
				})
				.otherwise(
					{redirectTo: "/"
				});
				
		});
})();
