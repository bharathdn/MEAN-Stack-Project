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
        model.getFavButtonColor     = getFavButtonColor;
        model.getFavButtonState     = getFavButtonState;


        var userFavBookIds = [];


        function getFavBooksForCurrentUser() {
            if ($rootScope.user != null) {
                ClientUserService.GetFavBooksForCurrentUser($rootScope.user._id)
                    .then(function (userFavBooks) {
                        getBookIds(userFavBooks);
                    });
            }
        }

        function getBookIds(bookFavObj){
            userFavBookIds = [];
            console.log(bookFavObj);
            if(bookFavObj != null) {
                for (var i = 0; i < bookFavObj.length; i++) {
                    if (userFavBookIds.indexOf(bookFavObj[i].ISBN_13) == -1) {
                        userFavBookIds.push(bookFavObj[i].ISBN_13);
                    }
                }
            }
            console.log(userFavBookIds);
        }

        function getFavButtonState(book){
            if(userFavBookIds.indexOf(book.id) == -1){
                //console.log("setting state auto");
                return "auto";
            }
            //console.log("setting state none");
            return "none";
        }

        function getFavButtonColor(book){
            if(userFavBookIds.indexOf(book.id) == -1){
                //console.log("setting color red");
                return "red";
            }
            //console.log("setting color Grey");
            return "blue";
        }

        model.searchQueryString = $window.sessionStorage.searchQueryString;
        searchForQuery();
        function searchForQuery() {
            if (!angular.isUndefined(model.searchQueryString)) {
                model.addFavMsg = null;
                searchQuery(model.searchQueryString);
            } else {
                //searchQuery("Godfather");
                $location.url("/search");
            }
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
                    getFavBooksForCurrentUser();
                    model.bookResults = searchResult.items;
                });
            }
        }

        function addFav(book){
            ClientUserService.addFavBookForUser($rootScope.user._id,book)
                .then(function (favAddResult){
                    if(favAddResult != null) {
                        model.fav_class = "alert-success";
                        model.addFavMsg = "\""+book.volumeInfo.title+ "\"" + " was added to your Favorites";
                        $window.scrollTo(0,0)
                        //searchQuery(model.searchQueryString);
                        getFavBooksForCurrentUser();
                    }else{
                        model.fav_class = "alert-warning";
                        model.addFavMsg = "You have already added this book as your favorites";
                        $window.scrollTo(0,0)
                    }
                });
        }

        function isLogin(){
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