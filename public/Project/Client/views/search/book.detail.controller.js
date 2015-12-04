(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("BookDetailController",BookDetailController);


    function BookDetailController($window, $rootScope, $location, ClientSearchService){

        var model = this;


        //model.searchQuery = searchQuery;
        //model.addFav = addFav;
        model.isLogin           = isLogin;
        model.submitReview      = submitReview;


        function submitReview(userReview){
            console.log("the Submitted Review: \n"+userReview);
        }

        model.book =JSON.parse($window.sessionStorage.getItem("currentBook"));
        //console.log(model.book);

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