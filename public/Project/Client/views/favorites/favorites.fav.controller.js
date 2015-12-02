(function(){
    angular
        .module("BukReviewApp")
        .controller("FavFavController",FavFavController);


    function FavFavController($location, $rootScope, ClientUserService, ClientSearchService) {
        var model = this;

        model.GetFavBooksForCurrentUser = GetFavBooksForCurrentUser;

        GetFavBooksForCurrentUser();
        function GetFavBooksForCurrentUser() {
            console.log("Fetching Fav books for User :" + $rootScope.user.username);

            ClientUserService.GetFavBooksForCurrentUser($rootScope.user._id)
                .then(function(userFavBooks){
                    if(userFavBooks != null){
                        model.favbooks = userFavBooks
                    }else{
                        model.noBookMsg = "You don't have any favorites yet!";
                    }
                });
        }
    }
})();