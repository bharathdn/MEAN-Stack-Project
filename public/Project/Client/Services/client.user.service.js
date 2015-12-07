(function(){

    angular
        .module("BukReviewApp")
        .factory("ClientUserService",ClientUserService);

    function ClientUserService($rootScope, $http, $q) {
        var service = {
            createUser                      : createUser,
            findUserById                    : findUserById,
            findUserByUserName              : findUserByUserName,
            findUserByUsernameAndPassword   : findUserByUsernameAndPassword,
            findAllUsers                    : findAllUsers,
            deleteUserById                  : deleteUserById,
            updateUser                      : updateUser,
            LoginUser                       : LoginUser,
            LogOutUser                      : LogOutUser,

            // USER FRIEND FUNCTIONS
            AddFriendForUserId              : AddFriendForUserId,
            findFriendsAndFollowersForId    : findFriendsAndFollowersForId,
            removeFriendorFollower          : removeFriendorFollower,

            //User Book Functions
            addFavBookForUser               : addFavBookForUser,
            GetFavBooksForCurrentUser       : GetFavBooksForCurrentUser,
            submitReview                    : submitReview,
            getReviewsForBookISBN           : getReviewsForBookISBN,
            GetReviewsByUserId              : GetReviewsByUserId,
            processReviews                  : processReviews,

        };
        return service;


        function GetReviewsByUserId(userId){
            var deferred = $q.defer();

            $http.get("/rest/api/userReviews/"+userId)
                .success(function(userReviews){
                    var processedReviews;
                    if((userReviews.reviews.length > 0)
                        && (userReviews.bookDetails.length > 0)){
                        processedReviews  = processReviews(userReviews);
                        deferred.resolve(processedReviews);
                    }
                    deferred.resolve(null);
                });
            return deferred.promise;
        }


        function getReviewsForBookISBN(bookISBN){
            var deferred = $q.defer();

            $http.get("/rest/api/bookreviews/"+bookISBN)
                .success(function(bookReviews){
                   deferred.resolve(bookReviews);
                });
            return deferred.promise;
        }


        function submitReview(book, user, userReview,centScore){
            //console.log(centScore);
            var reviewObj = { review    : userReview,
                              username  : user.username,
                              centScore : centScore,
                              bookObj   : book };
            var deferred = $q.defer();
            $http.post("/rest/api/bookReview/"+ user._id, reviewObj)
                .success(function (reviewRes){
                    deferred.resolve(reviewRes);
                });
            return deferred.promise;
        }


        function GetFavBooksForCurrentUser(userId){
            var deferred = $q.defer();
            $http.get("/rest/api/bookfavs/"+userId)
                .success(function (userFavs){
                    deferred.resolve(userFavs);
                });
            return deferred.promise;
        }


        function addFavBookForUser(userId,book){
            var deferred = $q.defer();
            $http.post("/rest/api/bookfav/"+userId, book)
                .success(function (userFavObj) {
                   deferred.resolve(userFavObj);
                });
            return deferred.promise;
        }


        function LogOutUser(){
            var deferred = $q.defer();
            //console.log(user);
            $http.post("/rest/api/logout")
                .success(function (userObj){
                    deferred.resolve(userObj);
                });
            return deferred.promise;
        }


        function LoginUser(user){
            var deferred = $q.defer();
            //console.log(user);
            $http.post("/rest/api/login",user)
                .success(function (userObj){
                    deferred.resolve(userObj);
                });
            return deferred.promise;
        }


        function findFriendsAndFollowersForId(userId){
            var deferred = $q.defer();

            console.log("finding Friends and Followers for "+userId);
            $http.get("/rest/api/friends/"+userId)
                .success(function (friendsFollowersObj) {
                    deferred.resolve(friendsFollowersObj);
                });
            return deferred.promise;
        }


        function AddFriendForUserId(userId, friendId){
            var deffered = $q.defer();
            //console.log("CLIENT USER SERVICE: Adding user"+friendId+" as friend to "+userId);
            $http.post("/rest/api/friend/"+userId+"/"+friendId)
                .success(function(userFriendObj){
                    //console.log("RESULT:::++CLIENT USER SERVICE: Adding user"+friendId+" as friend to "+userId);
                    deffered.resolve(userFriendObj);
                });
            return deffered.promise;
        }


        function removeFriendorFollower(userId, friendId){
            console.log("calling remove friend for "+userId+" on friend"+friendId);

            var deferred = $q.defer();
            $http.delete("/rest/api/friend/"+userId+"/"+friendId)
                .success(function (userObj){
                    deferred.resolve(userObj);
                });
            return deferred.promise;
        }


        function createUser(user) {
            var deferred = $q.defer();
            console.log("Client user Service : Create adding user:");
            console.log(user);
            $http.post("/rest/api/user", user)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }


        function findUserByUsernameAndPassword(user) {
            var deferred = $q.defer();
            $http.get("/rest/api/user?username=" + user.username + "&password=" + user.password)
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function updateUser(user) {
            var deferred = $q.defer();
            var userId = user._id;
            console.log("UserService-Client, updating user");
            console.log(user);
            $http.put("/rest/api/user/" + userId, user)
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/rest/api/user/" + userId)
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function findUserByUserName(username) {
            var deferred = $q.defer();
            $http.get("/rest/api/user?username="+username)
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function findAllUsers() {
            //console.log("CLIENT USER SERVICE: findAllUsers called");
            var deferred = $q.defer();
            $http.get("/rest/api/user/")
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function deleteUserById(userId) {
            $http.delete("/rest/api/user/"+userId)
                .success(function (userResponse) {
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function processReviews(userRevBooks){
            var books = userRevBooks.bookDetails;
            var userReviews = userRevBooks.reviews;
            var bookReview = [];
            for(var i=0; i<books.length; i++){
                var bookReviewObj = {};
                bookReviewObj.id                = books[i].ISBN_13;
                bookReviewObj.title             = books[i].title;
                bookReviewObj.googlePreviewLink = books[i].googlePreviewLink;
                bookReviewObj.sentimentRating   = books[i].sentimentRating;
                bookReviewObj.thumbnailUrl      = books[i].thumbnailUrl;
                bookReviewObj.reviews           = [];
                for(var j=0; j<userReviews.length; j++){
                    if(userReviews[j].bookId == books[i].ISBN_13){
                        var userReviewObj = {};
                        userReviewObj.reviewDesc        = userReviews[j].reviewDesc;
                        userReviewObj.sentimentRating   = userReviews[j].sentimentRating;
                        userReviewObj.date              = userReviews[j].reviewDate;
                        userReviewObj.username          = userReviews[j].username;
                        //console.log(userReviewObj);
                        bookReviewObj.reviews.push(userReviewObj);
                    }
                    //bookReviewObj.reviews.push()
                }
                bookReview.push(bookReviewObj);
            }
            return bookReview;
            //console.log(bookReview);
        }
    }
})();