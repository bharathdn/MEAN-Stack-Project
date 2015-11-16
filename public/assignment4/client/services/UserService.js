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
            $http.get("/api/assignment/userauth/"+user.userName+"/"+user.password)
                .success(function (userResponse){
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


        function updateUser(userId, user, callback) {
            var userIndex = getUserIndex(userId);

            currentUsers[userIndex].userName = user.userName;
            currentUsers[userIndex].password = user.password;
            currentUsers[userIndex].id = userId;
            currentUsers[userIndex].userFname = user.FName;
            currentUsers[userIndex].userLname = user.LName;
            currentUsers[userIndex].userEmail = user.email;

            // callback
            callback(currentUsers[userIndex]);
        }

        function getUserIndex(userId){
            var userIndex = null;
            for (var index = 0; index < mockUsers.length; index++) {
                if (currentUsers[index].id == userId) {
                    userIndex = index;
                    return userIndex;
                }
            }
            return userIndex;
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