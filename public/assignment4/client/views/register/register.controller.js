(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,UserService,$rootScope){
        //$scope.$location = $location;
        //$scope.register = register;
        var model = this;
        model.registerNewUser = registerNewUser;

        function registerNewUser(user){
            //console.log("Register Controller: new user registration");
            UserService.createUser(user)
                .then(function(newUser) {
                    registerCallback(newUser)
                });
        }

        function registerCallback(user){
            console.log(user);
            $rootScope.user = user;
            $location.url("/profile");
        }
    }
})();