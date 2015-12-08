(function(){
    angular
        .module("BukReviewApp")
        .controller("FavFavController",FavFavController);


    function FavFavController($window ,$location, $rootScope, ClientUserService, ClientSearchService) {
        var model = this;

        model.GetFavBooksForCurrentUser = GetFavBooksForCurrentUser;
        model.getBookDetails            = getBookDetails;


        GetFavBooksForCurrentUser();
        function GetFavBooksForCurrentUser() {
            //console.log("Fetching Fav books for User :" + $rootScope.user.username);

            ClientUserService.GetFavBooksForCurrentUser($rootScope.user._id)
                .then(function(userFavBooks){
                    if(userFavBooks != null){
                        model.favbooks = userFavBooks
                    }else{
                        model.noBookMsg = "You don't have any favorites yet!";
                    }
                });
        }

        function getBookDetails(book){
            console.log(book);

            ClientUserService.GetBookDetailsById(book.ISBN_13)
                .then(function(bookObjRes){
                    console.log(bookObjRes);
                    $window.sessionStorage.setItem("currentBook",angular.toJson(bookObjRes));
                    $location.url("/bookdetail");
                });
        }


    }
})();