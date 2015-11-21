(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,UserService,$rootScope) {
        //$scope.$location = $location;
        //$scope.register = register;
        var model = this;
        model.registerNewUser = registerNewUser;
        //model.message = "Hi";

        //TODO  Check if email already exists


        function registerNewUser(user) {
            UserService.findUserByUserName(username,1)
                    .then(function (user) {
                        if(user == null){
                            model.message("Username already exists, please choose a different username");
                        }
                    });
            if( user.password != user.verifypassword ) {
                passWordMessage = "Passwords don't match";
                model.passWordMessage = passWordMessage;
                registrationFlag = null;
            }

                console.log("creating user "+user.username);
                UserService.createUser(user)
                    .then(function (newUsers) {
                        //console.log(newUsers)
                        registerCallback(user)
                    });

        }

        function checkIfRegistrationPossible(user) {
            var registrationFlag;
            var usernameMessage = "";
            var passWordMessage = "";
            var res = findUserByUsernameClient(user.username);

            /*
            if(findUserByUsername(user.username) != null)
            {   console.log("Hi")
                model.message = "Username already exists, please choose a different username";
                //model.message = usernameMessage;
                registrationFlag = null;
            }

            else if( user.password != user.verifypassword ){
                passWordMessage = "Passwords don't match";
                //model.passWordMessage = passWordMessage;
                registrationFlag = null;
            }

            if(registrationFlag == null){
                console.log(usernameMessage);
                //model.message = usernameMessage;
                return registrationFlag;
            }

            return true;
            */
        }


        function findUserByUsernameClient(username){
            //console.log("find user called");
            UserService.findUserByUserName(username,1)
                .then(function (user) {
                    console.log(user);
                    return user;
                });
        }


        function registerCallback(user){
            //console.log(user);
            $rootScope.user = user;
            $location.url("/profile");
        }
    }

})();