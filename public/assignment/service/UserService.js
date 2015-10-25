(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService() {

        var currentUsers = [];

        function findUserByUsernameAndPassword(username, password, callback) {
            var userFlag = false;

            for (user in currentUsers) {
                if (user.userName == username) {
                    if (user.password == password) {
                        callback(user);
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
            //todo: check if username already exists

            //todo: check if password and verify password match

            var newUser = {
                userName: user.userName,
                password: user.password,
                id: createGuid(),
                userFname: user.Fname,
                userLname: user.Lname,
                userEmail: user.email
            };
            currentUsers.push(newUser);

            callback(newUser);
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
            $scope.currentUsers.splice(index,1);
            callback(deletedUser);
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