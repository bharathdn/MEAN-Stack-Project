(function(){
    angular
        .module("BukReviewApp")
        .controller("HomeController",HomeController);


    function HomeController($rootScope, $location){

        var model = this;

        model.searchQuery = searchQuery;

        //console.log("Hello from Home controller");
        function searchQuery(searchQueryString){
            //console.log("func called");
            //console.log(searchQueryString);
            if(!angular.isUndefined(searchQueryString)){
                $rootScope.searchQueryString = searchQueryString;
                $cookies.put('searchQueryString',searchQueryString);
                $location.url("/search_result");
            }
        }



    }

})();