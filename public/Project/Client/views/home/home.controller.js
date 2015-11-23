(function(){
    angular
        .module("BukReviewApp")
        .controller("HomeController",HomeController);


    function HomeController($location, $rootScope){

        var model = this;

        model.searchQuery = searchQuery;

        console.log("Hello from controller");


        function searchQuery(searchQueryString){
            //console.log("func called");
            console.log(searchQueryString);
        }



    }

})();