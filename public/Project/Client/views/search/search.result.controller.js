(function(){
    angular
        .module("BukReviewApp")
        .controller("SearchResultController",SearchResultController);


    function SearchResultController($rootScope, $location, SearchService){

        var model = this;

        model.searchQuery = searchQuery;


        model.searchQueryString = $rootScope.searchQueryString;

        if(!angular.isUndefined(model.searchQueryString)){
            searchQuery(model.searchQueryString);
        }else{
            $location.url("/search");
        }



        function searchQuery(searchQueryString) {
            console.log("func called");
            console.log(searchQueryString);
            if(!angular.isUndefined(searchQueryString)){
            SearchService.searchGoogleBook(searchQueryString)
                .then(function (searchResult) {
                    model.bookResults = searchResult.items;
                    //console.log("reply from Searchservice");
                    //console.log(searchResult.items);
                });
            }
        }
    }

})();