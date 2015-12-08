(function(){
    angular
        .module("BukReviewApp")
        .controller("FavFavController",FavFavController);


    function FavFavController($window ,$location, $rootScope, ClientUserService, ClientSearchService) {
        var model = this;

        model.GetFavBooksForCurrentUser = GetFavBooksForCurrentUser;
        model.getBookDetails            = getBookDetails;
        model.removeFav                 = removeFav;



        GetFavBooksForCurrentUser();
        function GetFavBooksForCurrentUser() {
            //console.log("Fetching Fav books for User :" + $rootScope.user.username);

            ClientUserService.GetFavBooksForCurrentUser($rootScope.user._id)
                .then(function(userFavBooks){
                    if(userFavBooks != null){
                        /*console.log("userFavBooks");
                        console.log(userFavBooks);*/
                        model.favbooks = userFavBooks
                    }else{
                        model.favbooks = null;
                        model.noBookMsg = "You don't have any favorites yet!";
                    }
                });
        }


        function removeFav(favbook){
            //console.log("you chose to unfavorite :"+favbook.title);
            //console.log(favbook);
            ClientUserService.RemoveFavBookForCurrentUser(favbook.ISBN_13, $rootScope.user._id)
                .then(function(userFavBooks){
                    console.log("book successfully unfavorited");
                    GetFavBooksForCurrentUser();
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