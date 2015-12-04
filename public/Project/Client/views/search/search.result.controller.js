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

        // Rating code
        //model.maxRating = 5;
        //model.isReadonly = true;
        //end of rating code

        /*model.rate = 2;
        model.max = 7;
        model.isReadonly = true;*/

        //model.searchQueryString = $rootScope.searchQueryString;

        model.searchQueryString = $window.sessionStorage.searchQueryString;
        console.log(model.searchQueryString);
        console.log($window.sessionStorage.searchQueryString);

        if(!angular.isUndefined(model.searchQueryString)){
            searchQuery(model.searchQueryString);
        }else{
            //searchQuery("Godfather");
            $location.url("/search");
        }

        function getBookDetails(book){
            //console.log(book);
            $rootScope.book = book;
            $window.sessionStorage.setItem("currentBook",angular.toJson(book));

            $location.url("/bookdetail");
        }

        function searchQuery(searchQueryString) {
            console.log("func called");
            console.log(searchQueryString);
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
                    if(favAddResult != null) {
                        console.log("Book " + book.volumeInfo.title + " added to User Fav");
                        //TODO: once user has added a book as fav,
                        // dont show fav icon for that user again
                    }else{
                        console.log("user has already added this book as fav");
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