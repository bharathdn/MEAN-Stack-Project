(function(){
	angular
		.module("FormBuilderApp",["ngRoute"])
		.config(function($routeProvider){
			$routeProvider
				.when("/",{
					templateUrl: "views/home/home.view.html"
				})
				.when("/home",{
					templateUrl: "views/home/home.view.html"
				})
				.when("/profile",{
					templateUrl: "views/profile/profile.view.html"
				})
				.when("/admin",{
					templateUrl: "views/admin/admin.view.html"
				})
				.when("/form",{
					templateUrl: "views/form/form.view.html"
				})
				/*
				.when("/form-fields",{
					templateUrl: "form/form-fields.view.html"
				})
				*/
				.when("/login",{
					templateUrl: "views/login/login.view.html"
				})
				.when("/register",{
					templateUrl: "views/register/register.view.html"
				})
				.otherwise(
					{ redirectTo: "/"
				});
				
		});
})();
