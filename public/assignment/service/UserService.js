(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService() {

        var currentUsers = [];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            var userFlag = false;

            for (user in currentUsers) {
                if (user.userName == username) {
                    if (user.password == password) {
                        return true;
                    }
                }
                else {
                    return null;
                }
            }

            // callback
        }

        function findAllUsers(callback) {
            return currentUsers;
            //callback
        }

        function createUser(user, callback) {
            var newUser = {
                userName: user.userName,
                password: user.password,
                //guid = create a guid
                userFname: user.Fname,
                userLname: user.Lname,
                userEmail: user.Email
            }
            $scope.currentUsers.push(newUser);

            // on success callback
        }

        function getUserIndex(userId){
            var userIndex = false;
            for (var index = 0; index < currentUsers.length; index++) {
                if (currentUsers[i].userName == userId) {
                    userIndex = i;
                    continue;
                }
            }
            return userIndex;
        }

        function deleteUserById(userId, callback) {
            var userIndex = getUserIndex(userId);
            $scope.currentUsers.splice(index,1);



            // callback
        }

        function updateUser(userId, user, callback) {
            var userIndex = getUserIndex(userId);

            currentUsers[userIndex].userName = user.userName;
            currentUsers[userIndex].password = user.password;
            currentUsers[userIndex].userFname = user.userFname;
            currentUsers[userIndex].userLname = user.userLname;
            currentUsers[userIndex].userEmail = user.userEmail;

            // callback
        }
    }
})();