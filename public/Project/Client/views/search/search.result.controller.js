(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("SearchResultController",SearchResultController);


    function SearchResultController($window,$rootScope, $location, ClientSearchService,
                                     ClientUserService){

        var model = this;

        model.searchQuery           = searchQuery;
        model.addFav                = addFav;
        model.isLogin               = isLogin;
        model.getBookDetails        = getBookDetails;
        model.hideAlert             = hideAlert;



        model.searchQueryString = $window.sessionStorage.searchQueryString;
        /*console.log(model.searchQueryString);
        console.log($window.sessionStorage.searchQueryString);*/

        if(!angular.isUndefined(model.searchQueryString)){
            model.addFavMsg = null;
            searchQuery(model.searchQueryString);
        }else{
            //searchQuery("Godfather");
            $location.url("/search");
        }


        function hideAlert(){
            model.addFavMsg = null;
        }

        function getBookDetails(book){
            //console.log(book);
            $rootScope.book = book;
            $window.sessionStorage.setItem("currentBook",angular.toJson(book));

            $location.url("/bookdetail");
        }

        function searchQuery(searchQueryString) {
            //console.log("func called");
            //console.log(searchQueryString);
            if(!angular.isUndefined(searchQueryString)){
                ClientSearchService.searchGoogleBooks(searchQueryString)
                .then(function (searchResult) {
                    model.bookResults = searchResult.items;
                });
            }
        }

        function addFav(book){
            console.log("You marked the book as favorite :"+ book.volumeInfo.title);
            console.log(book);
            ClientUserService.addFavBookForUser($rootScope.user._id,book)
                .then(function (favAddResult){
                    /*console.log("favAddResult");
                    console.log(favAddResult);*/
                    if(favAddResult != null) {
                        //console.log("favAddResult");
                        //console.log(favAddResult);
                        //console.log("Book " + book.volumeInfo.title + " added to User Fav");
                        model.fav_class = "alert-success";
                        model.addFavMsg = book.volumeInfo.title + " added to your Favorites";
                        $window.scrollTo(0,0)
                        //TODO: once user has added a book as fav,
                        // dont show fav icon for that user again
                    }else{
                        /*console.log("favAddResult");
                        console.log(favAddResult);
                        console.log("user has already added this book as fav");*/
                        model.fav_class = "alert-warning";
                        model.addFavMsg = "You have already added this book as your favorites";
                        $window.scrollTo(0,0)
                    }
                });
        }

        function isLogin(){
            //console.log("checking if user is logged in");
            //console.log($rootScope.user);
            if($rootScope.user == null)
            {
                return true;
            }
            else{
                var loggedInUser = $rootScope.user.username;
                model.username = loggedInUser[0].toUpperCase() + loggedInUser.slice(1);
            }
        }
    }

})();