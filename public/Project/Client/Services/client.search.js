(function(){

    angular
        .module("BukReviewApp")
        .factory("SearchService",SearchService);

    function SearchService($http,$q) {

        var service = {
            searchGoogleBook: searchGoogleBook
        };
        return service;

        function searchGoogleBook(searchQuery) {
            console.log("client Search Service :: Searching for Query -> " + searchQuery);

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