(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(username,password,callback) {

        }

        function findAllUsers(callback) {

        }

        function createUser(user,callback) {

        }

        function deleteUserById(userId,callback) {

        }

        function updateUser(userId,user,callback) {

        }
    }
})();