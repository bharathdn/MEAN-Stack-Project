(function(){
	angular
		.module("FormBuilderApp",["ngRoute"])
		.config(function($routeProvider){
			$routeProvider
				.when("/",{
					templateUrl: "home/home.view.html"
				})
				.when("/home",{
					templateUrl: "home/home.view.html"
				})
				.when("/profile",{
					templateUrl: "profile/profile.view.html"
				})
				.when("/admin",{
					templateUrl: "admin/admin.view.html"
				})
				.when("/form",{
					templateUrl: "form/form.view.html"
				})
				/*
				.when("/form-field",{
					templateUrl: "form/_field.view.html"
				})
				*/
				.when("/login",{
					templateUrl: "login/login.view.html"
				})
				.when("/register",{
					templateUrl: "register/register.view.html"
				})
				.otherwise(
					{ redirectTo: "/"
				});
				
		});
})();
