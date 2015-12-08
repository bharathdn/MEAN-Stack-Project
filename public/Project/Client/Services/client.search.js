(function(){

    angular
        .module("BukReviewApp")
        .factory("ClientSearchService",ClientSearchService);

    function ClientSearchService($http,$q) {

        var service = {
            searchGoogleBooks           : searchGoogleBooks,
            analyseReview               : analyseReview
        };
        return service;

        function searchGoogleBooks(searchQuery) {
            //console.log("Client Search Service :: Searching for Query -> " + searchQuery);

            var url = "https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&key=AIzaSyDX4yrNGscA-AsXKxw5mzD6oKxnjaukLT0"

            var deferred = $q.defer();
            $http.get(url)//+"&callback=JSON_CALLBACK")
                .success(function (response) {
                    deferred.resolve(response);
                    /*console.log(response.items);
                     return response.items;*/
                });
            //return "Dummy";
            return deferred.promise;
        }


        function analyseReview(userReview) {
            //console.log("Client Search Service :: Searching for Query -> " + searchQuery);
            var alchemyUrl =    "http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?" +
                "apikey=b0c075efc347c9a79bdd0812534fd694f86e5dc1&" +
                "text="+userReview+"&outputMode=json&showSourceText=0"

            var deferred = $q.defer();
            $http.get(alchemyUrl)
                .success(function (response) {
                    //console.log(response);
                    /*console.log(response.docSentiment);
                    console.log(response.docSentiment.score);
                    console.log(response.docSentiment.type);*/
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }

})();