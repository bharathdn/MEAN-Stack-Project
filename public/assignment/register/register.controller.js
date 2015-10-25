(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($scope, $location,UserService,$rootScope){
        //$scope.$location = $location;
        $scope.register = register;


        function register(){
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