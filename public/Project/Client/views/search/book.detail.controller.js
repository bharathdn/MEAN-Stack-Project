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

        // set model.reviews
        getReviewsForBookISBN(model.book.volumeInfo. industryIdentifiers[0].identifier);

        function getReviewsForBookISBN(bookISBN){
            console.log("fectching reviews for book "+model.book.volumeInfo.title);
            ClientUserService.getReviewsForBookISBN(bookISBN)
                .then(function(bookReviews){
                    console.log(bookReviews);
                    model.reviews = bookReviews;
                });
        }


        function submitReview(userReview){
            ClientSearchService.analyseReview(userReview)
                .then(function(sentimentResponse){
                    if(sentimentResponse.status == "OK") {
                        displayReviewFeedback(sentimentResponse.docSentiment);
                        console.log(sentimentResponse.docSentiment);
                        var centScore = getcentScore(sentimentResponse.docSentiment.score);
                        ClientUserService.submitReview(model.book, $rootScope.user,userReview, centScore)
                            .then(function(reviewSubmitResult){
                                console.log(reviewSubmitResult);
                                clearTextArea();
                            });
                    }
                    else{
                        console.log("error in sentiment analysis api result");
                        return;
                        }
                });
        }

        function clearTextArea(){
            model.userReview = "";
        }

        function getcentScore(score){

            var centScore = (parseFloat(score) + 0.5) * 100;
            if(centScore > 100)
            {
                centScore = 100;
            }
            if(centScore < 0)
            {
                centScore = 5;
            }
            return centScore.toFixed(0);
        }

        function displayReviewFeedback(sentimentResp) {

            var score = parseFloat(sentimentResp.score);
            console.log(score);
            var type = sentimentResp.type;

            var centScore = (score + 0.5) * 100;
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
            else if(centScore < 31)  { if(centScore < 0){
                                                                centScore = 5;
                                                            }

                                                            positivity = "Negative";
                                                            model.alert_class = "alert-danger";}

            model.sentimentMsg = "Review Submitted!  Your review was "+positivity+" and " +
                "scored "+centScore.toFixed(0)+ "% upon sentiment analysis";
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