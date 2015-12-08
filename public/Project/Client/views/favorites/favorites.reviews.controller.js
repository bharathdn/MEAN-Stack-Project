(function(){
    angular
        .module("BukReviewApp")
        .controller("FavReviewController",FavReviewController);


    function FavReviewController($location, $rootScope, ClientUserService, ClientSearchService) {
        var model = this;

        model.GetReviewsByCurrentUser = GetReviewsByCurrentUser;
        model.isCurrentUser           = isCurrentUser;


        GetReviewsByCurrentUser($rootScope.user._id);
        function GetReviewsByCurrentUser(userId) {
            //console.log("Fetching Reviews by User :" + $rootScope.user.username);

            ClientUserService.GetReviewsByUserId(userId)
                .then(function(userRevBooks){
                    console.log("======userRevBooks=====");
                    console.log(userRevBooks);
                    if(userRevBooks != null){
                            renderReviews(userRevBooks);
                    }else{
                        model.noBookMsg = "You have not reviewed books yet!";
                    }
                });
        }

        function isCurrentUser(username){
            if($rootScope.user) {
                if ($rootScope.user.username == username) {
                    return true;
                }
            }
            return false;
        }

        function renderReviews(userReviews){
            console.log(userReviews);
            model.reviewBooks = userReviews;
        }
    }
})();