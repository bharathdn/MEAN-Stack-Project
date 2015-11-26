(function(){

    angular
        .module("BukReviewApp")
        .factory("ClientSearchService",ClientSearchService);

    function ClientSearchService($http,$q) {

        var service = {
            searchGoogleBooks: searchGoogleBooks
        };
        return service;

        function searchGoogleBooks(searchQuery) {
            console.log("Client Search Service :: Searching for Query -> " + searchQuery);

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
    }

})();