(function(){
    angular
        .module("BukReviewApp")
        .controller("SearchResultController",SearchResultController);


    function SearchResultController($rootScope, $location, SearchService){

        var model = this;

        model.searchQuery = searchQuery;




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
            SearchService.searchGoogleBook(searchQueryString)
                .then(function (searchResult) {
                    model.bookResults = searchResult.items;
                });
            }
        }
    }

})();