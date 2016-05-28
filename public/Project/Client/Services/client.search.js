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

            var url = "https://www.googleapis.com/books/v1/volumes?q=" + searchQuery + "&key=AIzaSyBdQyDKgpdXsrbXepXUXZEdL4Zy6E1PlfM"

            var deferred = $q.defer();
            $http.get(url)//+"&callback=JSON_CALLBACK")
                .success(function (response) {
                    //for all responses, set the description to 700 words
                    if(response != null) {

                        if(response.totalItems === 0){
                            deferred.resolve(400);
                        }
                        var trimmedResponse = trimResponse(response);
                        deferred.resolve(trimmedResponse);
                        /*console.log(response.items);
                         return response.items;*/
                    }
                    else
                    {
                        deferred.resolve(null);
                    }
                });
            //return "Dummy";
            return deferred.promise;
        }

        function trimResponse(response){
            var responseItems = response.items;
            for(var i=0; i < responseItems.length; i++){
                if(responseItems[i].volumeInfo.description &&  (responseItems[i].volumeInfo.description.length > 700)) {
                    responseItems[i].volumeInfo.description =
                        responseItems[i].volumeInfo.description.substr(0,
                            responseItems[i].volumeInfo.description.indexOf(' ', 695)) + ".....";
                }
                if(responseItems[i].volumeInfo.title && (responseItems[i].volumeInfo.title.length > 40 )){
                    responseItems[i].volumeInfo.title = responseItems[i].volumeInfo.title.substr(0,
                        responseItems[i].volumeInfo.title.indexOf(' ', 40));
                }
            }
            var result = {};
            result.items = responseItems;

            return result;

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