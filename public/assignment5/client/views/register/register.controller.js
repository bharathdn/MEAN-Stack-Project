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
            // Check if username already exists


            //  Check if email already exists



            UserService.createUser(user)
                .then(function(newUsers) {
                    //console.log(newUsers)
                    registerCallback(user)
                });
        }

        function registerCallback(user){
            //console.log(user);
            $rootScope.user = user;
            $location.url("/profile");
        }
    }
})();