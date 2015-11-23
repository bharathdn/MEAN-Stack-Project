"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,UserService,$rootScope) {
        //$scope.$location = $location;
        var model = this;
        model.registerNewUser = registerNewUser;
        //model.message = "Hi";

        //TODO  Check if email already exists
        console.log($rootScope.user);

        function registerNewUser(user) {
            var registrationPossible = true;
            var userResult;
            if(!angular.isObject(user)) {
                model.message = "All fields are mandatory!";
                registrationPossible = false;
                return;
            }


            if(user.username != null) {
                UserService.findUserByUserName(user.username)
                    .then(function (userResult) {
                        if (userResult !== null) {
                            model.message = "Username already exists, please choose a different username";
                        }
                    });
            }
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
                registrationPossible = false;
            }
            /*
            if(userResult !== null ||
                user.email == "undefined" ||
                user.password == "undefined" ||
                user.verifypassword == "undefined"
                ){
                model.message = "All fields are mandatory";
                registrationPossible = false;
            }
            */
            if(registrationPossible == true) {
                console.log("creation of user possible: " + user.username);
                UserService.createUser(user)
                    .then(function (user) {
                        registerCallback(user)
                    });
            }
        }


        function registerCallback(user){
            $rootScope.user = user;
            console.log("user obj from reg contr");
            console.log($rootScope.user);
            $location.url("/profile");
        }
    }

})();