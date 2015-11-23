(function(){
    angular
        .module("BukReviewApp")
        .controller("HomeController",HomeController);


    function HomeController($location, $rootScope,SearchService){

        var model = this;

        model.searchQuery = searchQuery;

        //console.log("Hello from controller");


        function searchQuery(searchQueryString){
            //console.log("func called");
            //console.log(searchQueryString);
            var res = SearchService.searchGoogleBook(searchQueryString);
                /*.then(function (searchResult) {
                    console.log("reply from Searchservice");
                    console.log(searchResult);
                });*/
            console.log("reply from Searchservice");
            console.log(res);
        }



    }

})();