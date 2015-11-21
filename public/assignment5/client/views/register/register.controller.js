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
            console.log(user.password);
            var registrationPossible = true;
            var userResult;
            UserService.findUserByUserName(user.username)
                .then(function (userResult) {
                    if (userResult !== null) {
                        model.message = "Username already exists, please choose a different username";
                    }
                });

            console.log(registrationPossible); // = false;

            if(user.password == null || user.password == "undefined"){
                model.passwordMsg = "Password is mandotory";
                if (user.password != user.verifypassword) {
                    registrationPossible = false;
                    console.log(registrationPossible);
                    console.log("msg from password check")
                }
            }
            if(user.email == null || user.email == "undefined")
            {
                model.emailMsg="Email is mandatory";
            }
            if(userResult !== null || ){
                registrationPossible = false;
            }

            if(registrationPossible == true) {
                console.log("creation of user possible: " + user.username);
                UserService.createUser(user)
                    .then(function (newUsers) {
                        //console.log(newUsers)
                        registerCallback(user)
                    });
            }
            */
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
                    //console.log(user);
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