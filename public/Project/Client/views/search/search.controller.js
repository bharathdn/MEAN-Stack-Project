(function(){
    angular
        .module("BukReviewApp")
        .controller("SearchController",SearchController);


    function SearchController($window ,$rootScope, $location, ClientSearchService){

        var model = this;

        model.searchQuery = searchQuery;

        function searchQuery(searchQueryString){
            console.log("func called");
            console.log(searchQueryString);
            if(!angular.isUndefined(searchQueryString)){
                $window.sessionStorage.searchQueryString = searchQueryString;
                //$rootScope.searchQueryString = searchQueryString;
                $location.url("/search_result");
            }

        }
    }

})();