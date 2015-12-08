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


        function getBookDetails(favbook){
            //console.log(favbook);

            var bookObj = {};

            var volumeInfo = {};
            volumeInfo.title                        = favbook.title;

            var imageLinks = {}
            imageLinks.smallThumbnail               = favbook.thumbnailUrl;


            volumeInfo.imageLinks                   = imageLinks;
            volumeInfo.canonicalVolumeLink          = favbook.googlePreviewLink;
            volumeInfo.previewLink                  = favbook.googlePreviewLink;
            volumeInfo.averageRating                = parseFloat(parseInt(favbook.sentimentRating))/20;
            volumeInfo.description                  = favbook.description;
            //volumeInfo.id                           = favbook.ISBN_13;

            bookObj.volumeInfo = volumeInfo;
            bookObj.id                              = favbook.ISBN_13;
            $window.sessionStorage.setItem("currentBook",angular.toJson(bookObj));
            $location.url("/bookdetail");
        }


    }
})();