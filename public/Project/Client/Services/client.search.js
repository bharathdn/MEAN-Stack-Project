(function(){

    angular
        .module("BukReviewApp")
        .factory("SearchService",SearchService);

    function SearchService($http,$q){

        var service = {
            searchGoogleBook: searchGoogleBook
        };
        return service;

        function searchGoogleBook(searchQuery){
            console.log("Searching for Query: "+searchQuery);

            var url = "https://www.googleapis.com/books/v1/volumes?q="+searchQuery+"&key=AIzaSyDX4yrNGscA-AsXKxw5mzD6oKxnjaukLT0"
            $http.jsonp(url+"&callback=JSON_CALLBACK")
                .success(function(response){
                    console.log(response);
                }).error(function(err){
                    consoleSchema.log(err);
                    console.log("Request Failed");
                })
            //return "Dummy";
        }


/*
        var url = "http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0";


        $http.jsonp(url+"&callback=JSON_CALLBACK").success
            //$http.jsonp(url).success
        (function(response) {
            console.log(response);
            $scope.movies = response;
        }).error(function(){
            console.log("request failed");
        });
 */

    }

})();