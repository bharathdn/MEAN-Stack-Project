(function(){
    angular
        .module("BukReviewApp")//,['ui.bootstrap'])
        .controller("BookDetailController",BookDetailController);


    function BookDetailController($window, $rootScope, $location, ClientSearchService, ClientUserService){

        var model = this;


        //model.searchQuery = searchQuery;
        //model.addFav = addFav;
        model.isLogin           = isLogin;
        model.submitReview      = submitReview;

        model.book = JSON.parse($window.sessionStorage.getItem("currentBook"));
        //console.log(model.book);


        function submitReview(userReview){
            var bookISBN = model.book.volumeInfo. industryIdentifiers[0].identifier;
            console.log("the Submitted Review: \n"+userReview);
            ClientSearchService.analyseReview(userReview)
                .then(function(sentimentResponse){
                    if(sentimentResponse.status == "OK") {
                        displayReviewFeedback(sentimentResponse.docSentiment);
                        console.log(sentimentResponse.docSentiment);
                        ClientUserService.submitReview(bookISBN, $rootScope.user._id,userReview)
                            .then(function(reviewSubmitResult){
                                console.log(reviewSubmitResult);
                            });
                    }
                    else{
                        console.log("error in sentiment analysis api result");
                        return;
                        }
                });
        }

        function displayReviewFeedback(sentimentResp) {

            var score = parseFloat(sentimentResp.score);
            console.log(score);
            var type = sentimentResp.type;

            var centScore = (score + 0.3) * 100;
            var positivity;  // = "Positive";

            if (centScore >= 75)    {                       if(centScore > 100){
                                                                centScore = 100;
                                                            }
                                                            positivity = "Positive";
                                                            model.alert_class = "alert-success";}
            else if(centScore >= 50 && centScore < 75)  { positivity = "moderately Positive";
                                                            model.alert_class = "alert-info"}
            else if(centScore >= 31 && centScore < 50)  { positivity = "moderatly Negative";
                                                            model.alert_class = "alert-warning"}
            else if(centScore >=  0 && centScore < 31)  { positivity = "Negative";
                                                            model.alert_class = "alert-danger";}

            model.sentimentMsg = "Your review was "+positivity+" and scored "+centScore.toFixed(0)+ "% upon sentiment analysis";
            return;
        }


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