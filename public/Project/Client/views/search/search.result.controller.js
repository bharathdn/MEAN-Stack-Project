(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("SearchResultController",SearchResultController);


    function SearchResultController($rootScope, $location, ClientSearchService){

        var model = this;

        model.searchQuery = searchQuery;
        model.addFav = addFav;
        model.isLogin = isLogin;




        // Rating code
        //model.maxRating = 5;
        //model.isReadonly = true;
        //end of rating code

        model.rate = 2;
        model.max = 7;
        model.isReadonly = true;

        model.searchQueryString = $rootScope.searchQueryString;
        if(!angular.isUndefined(model.searchQueryString)){
            searchQuery(model.searchQueryString);
        }else{
            searchQuery("Godfather");
            //$location.url("/search");
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