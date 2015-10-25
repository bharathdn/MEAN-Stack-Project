(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($scope, $location,UserService,$rootScope){
        //$scope.$location = $location;
        $scope.register = register;


        function register(){
            //console.log("register function called");
            //console.log("entered username is "+$scope.userName);

            //console.log("entered email is "+$scope.email);

            /*var inputUserName = $scope.userName;
            var inputPassword = $scope.password;
            var inputEmail = $scope.email;

            var user = {
                userName : inputUserName,
                password : inputPassword,
                email : inputEmail,
                Fname : "",
                Lname : ""
            }; */


            var user = {
                userName : $scope.userName,
                password : $scope.password,
                email : $scope.email
            };

            UserService.createUser(user,registerCallback);

        }
        function registerCallback(user)
        {
            console.log(user);
            $rootScope.user = user;
        }
    }
})();