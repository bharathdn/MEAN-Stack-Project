(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("BookDetailController",BookDetailController);


    function BookDetailController($window, $rootScope, $location, ClientSearchService, $q,$http){

        var model = this;


        //model.searchQuery = searchQuery;
        //model.addFav = addFav;
        model.isLogin           = isLogin;
        model.submitReview      = submitReview;


        function submitReview(userReview){
            console.log("the Submitted Review: \n"+userReview);

            ClientSearchService.analyseReview(userReview)
                .then(function(sentimentResponse){
                    if(sentimentResponse.status == "OK") {
                        displayReviewFeedback(sentimentResponse.docSentiment);
                        console.log(sentimentResponse.docSentiment);
                    }
                    else{
                        return;
                        }
                });
        }

        function displayReviewFeedback(sentimentResp) {

            var score = parseFloat(sentimentResp.score);
            var type = sentimentResp.type;

            var centScore = score + 0.5 * 100;
            model.sentimentMsg = "Your review was Positive and scored " + centScore.toFixed(0) + " upon sentiment analysis";

            if (centScore > 75) {
                model.sentimentMsg = "Your review was Positive and scored " + centScore + "upon sentiment analysis";
            }
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