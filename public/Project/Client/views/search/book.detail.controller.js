(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("BookDetailController",BookDetailController);


    function BookDetailController($rootScope, $location, ClientSearchService){

        var model = this;

        //model.searchQuery = searchQuery;
        model.addFav = addFav;
        model.isLogin = isLogin;

        // Rating code
        //model.maxRating = 5;
        //model.isReadonly = true;
        //end of rating code

        model.rate = 2;
        model.max = 7;
        model.isReadonly = true;

        book = $rootScope.book;


        function addFav(book){
            console.log("You marked the book as favorite :"+ book.volumeInfo.title);
        }

        function isLogin(){
            //console.log("checking if user is logged in");
            //console.log($rootScope.user);
            if($rootScope.user == null)
            {
                return true;
            }
            else{
                var loggedInUser = $rootScope.user.username;
                model.username = loggedInUser[0].toUpperCase() + loggedInUser.slice(1);
            }
        }
    }

})();