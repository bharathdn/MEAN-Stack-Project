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

            // USER FRIEND FUNCTIONS
            AddFriendForUserId              : AddFriendForUserId,
            findFriendsAndFollowersForId    : findFriendsAndFollowersForId
        };
        return service;


        function LoginUser(user){
            var deferred = $q.defer();
            console.log(user);
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

            console.log("CLIENT USER SERVICE: Adding user"+friendId+" as friend to "+userId);
            $http.post("/rest/api/friend/"+userId+"/"+friendId)
                .success(function(userFriendObj){
                    deffered.resolve(userFriendObj);
                });
            return deffered.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            console.log("Client user Service : Create adding user:");
            console.log(user);
            $http.post("/rest/api/user", user)
                .success(function (user) {
                    //console.log("added user obj from USerService");
                     //console.log(users);
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
            console.log("CLIENT USER SERVICE: findAllUsers called");
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
    }
})();