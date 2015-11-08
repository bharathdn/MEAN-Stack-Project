(function(){
    angular
        .module("BukReviewApp",["ngRoute"])
        .config(function($routeProvider) {
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
            .when("/register",{
                templateUrl: "register/register.view.html"
            })
            .when("/search",{
                templateUrl: "search/search.view.html"
            })
            .when("/favorite",{
                templateUrl: "favorites/favorite.view.html"
            })
            .when("/login",{
                templateUrl: "login/login.view.html"
            })
            .otherwise("/",
                {redirectTo: "/"
            });
        });
})();