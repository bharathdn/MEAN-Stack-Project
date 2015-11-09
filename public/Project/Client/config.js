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
            .when("/search_result",{
                templateUrl: "search/search_result.view.html"
            })
            .when("/favorites",{
                templateUrl: "favorites/favorites-reviews.view.html"
            })
            .when("/favorite_books",{
                templateUrl: "favorites/favorites-favorite.view.html"
            })
            .when("/login",{
                templateUrl: "login/login.view.html"
            })
            .otherwise("/",
                {redirectTo: "/"
            });
        });
})();