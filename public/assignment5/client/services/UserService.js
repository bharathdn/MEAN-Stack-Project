(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope, $http, $q) {
        var service = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUserName: findUserByUserName,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function createUser(user) {
            var deferred = $q.defer();

            //todo: check if username already exists

            //todo: check if password and verify password match

            $http.post("/api/assignment/user", user)
                .success(function (users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }


        function findUserByUsernameAndPassword(user) {
            var deferred = $q.defer();
            console.log("Client UserService : authenticating user:"+user.username);
            $http.get("/api/assignment/user?username="+user.username+"&password="+user.password)
                .success(function (userResponse){
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }


        function updateUser(userId, user) {
            var deferred = $q.defer();

            $http.put("/api/assignment/user/"+userId)
                .success(function(userResponse){
                    deferred.resolve(userResponse);
                });
            return deferred.promise;
        }

        function findUserById(userId){

        }


        function findUserByUserName(userName){

        }


        function findAllUsers(callback) {
            callback(currentUsers);
        }


        function deleteUserById(userId, callback) {
            var userIndex = getUserIndex(userId);
            var deletedUser = currentUsers[userIndex];
            currentUsers.splice(index,1);
            callback(currentUsers);
        }

    }

    function createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

})();