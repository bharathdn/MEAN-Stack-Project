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
            console.log("UserService :: new user registration called");
            var newUser = {
                userName: user.userName,
                password: user.password,
                id: createGuid(),
                userFname: user.Fname,
                userLname: user.Lname,
                userEmail: user.email
            };

            $http.post("/api/assignment/user", newUser)
                .success(function (users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }


        function findUserByUsernameAndPassword(user) {
            var deferred = $q.defer();
            //var username = user.userName;
            //var password = user.password;
            console.log("Client UserService : authenticating user:"+user.userName);
            var searchUser = { username: user.userName,
                password: user.password };

            //$http.get("/api/assignment/userauth/"+user.userName+"/"+user.password)
//            $http.get("/api/assignment/user?username=" + username + "&password=" + password)

            $http.get("/api/assignment/user?username="+user.userName+"&password="+user.password)
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