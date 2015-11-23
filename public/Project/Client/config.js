(function(){
    angular
        .module("BukReviewApp",["ngRoute"])
        .config(function($routeProvider) {
            $routeProvider
                .when("/",{
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController as model"
                })
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController as model"
                })
                .when("/profile",{
                    templateUrl: "views/profile/profile.view.html"
                })
                .when("/profile_friends",{
                    templateUrl: "views/profile/profile_friends.view.html"
                })
                .when("/register",{
                    templateUrl: "views/register/register.view.html"
                })
                .when("/search",{
                    templateUrl: "views/search/search.view.html"
                })
                .when("/search_result",{
                    templateUrl: "views/search/search_result.view.html"
                })
                .when("/favorites",{
                    templateUrl: "views/favorites/favorites-reviews.view.html"
                })
                .when("/favorite_books",{
                    templateUrl: "views/favorites/favorites-favorite.view.html"
                })
                .when("/login",{
                    templateUrl: "views/login/login.view.html"
                })
                .otherwise("/",
                    {redirectTo: "/"
                });
        });
})();