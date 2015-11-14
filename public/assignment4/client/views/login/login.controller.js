(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);


    function LoginController($scope, $location,UserService,$rootScope){
        $scope.login = login;

        function login(){
            UserService.findUserByUsernameAndPassword(
                $scope.userName, $scope.password,userLoginCallback);
        }

        function userLoginCallback(user){
            if(user != null){
                $rootScope.user = user;
                console.log("user found, login sucessful");
                $location.url("/");
            }
            else
            {
                console.log("user not found, login failed");
            }
        }
    }
})();