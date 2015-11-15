(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope, $http, $q) {
        
        function findUserByUsernameAndPassword(username, password, callback) {
            //console.log('user: '+username+' password: '+password);
            for (userIndex in currentUsers) {
                if (currentUsers[userIndex].userName == username) {
                    if (currentUsers[userIndex].password == password) {
                        callback(currentUsers[userIndex]);
                        return;
                    }
                }
                else {
                    callback(null);
                }
            }
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(user, callback) {
            var deferred = $q.defer();

            //todo: check if username already exists

            //todo: check if password and verify password match
            console.log("UserService :: new user registration called")
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


        function getUserIndex(userId){
            var userIndex = false;
            for (var index = 0; index < currentUsers.length; index++) {
                if (currentUsers[index].id == userId) {
                    userIndex = index;
                    continue;
                }
            }
            return userIndex;
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

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;
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