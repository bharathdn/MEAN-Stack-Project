(function(){
    angular
        .module("BukReviewApp",["ngRoute"])
        .config(function($routeProvider) {
            $routeProvider
                .when("/",{redirectTo: "/home",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController as model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/profile",{
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/publicprofile",{
                    templateUrl: "views/profile/profile.public.html",
                    controller: "ProfilePublicController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/profile_friends",{
                    templateUrl: "views/profile/profile.friends.view.html",
                    controller: "ProfileFriendsController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/register",{
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController as model"
                })
                .when("/search",{
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/search_result",{
                    templateUrl: "views/search/search.results.view.html",
                    controller: "SearchResultController as model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/bookdetail",{
                    templateUrl: "views/search/book.detail.view.html",
                    controller: "BookDetailController as model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/favorites",{
                    templateUrl: "views/favorites/favorites-reviews.view.html",
                    controller: "FavReviewController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/favorite_books",{
                    templateUrl: "views/favorites/favorites-favorite.view.html",
                    controller: "FavFavController as model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })
                .when("/login",{
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController as model"
                })
                .otherwise("/",
                    {redirectTo: "/home",
                        resolve: {
                            loggedin: checkLoggedIn
                        }
                });
        });


    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope){

        var deferred = $q.defer();

        $http.get("/rest/api/loggedin")
            .success(function (user) {
                $rootScope.errorMessage = null;
                //USer is Authenticted
                if(user !== '0'){
                    $rootScope.user = user;
                    deferred.resolve();
                }
                else{
                    $rootScope.errorMessage = "Please log in...";
                    deferred.reject();
                    $location.url("/login");
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get("/rest/api/loggedin")
            .success(function(user){
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
    };

})();