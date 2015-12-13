"use strict";
(function(){
    angular
        .module("BukReviewApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,ClientUserService,$rootScope) {
        //$scope.$location = $location;
        var model = this;
        model.registerNewUser = registerNewUser;
        //model.message = "Hi";


        //TODO  Check if email already exists
        //console.log($rootScope.user);
        console.log("Register Controller!!!!!");
        function registerNewUser(user) {
            console.log("Register called with following details");
            console.log(user);
            var registrationPossible = true;
            var userResult;
            if(!angular.isObject(user)) {
                model.message = "All fields are mandatory!";
                registrationPossible = false;
                return;
            }

            if(user.password == null || user.password == "undefined"){
                model.passwordMsg = "Password is mandotory";
                if (user.password != user.verifypassword) {
                    registrationPossible = false;
                    //console.log(registrationPossible);
                    //console.log("msg from password check")
                }
            }
            if(user.email == null || user.email == "undefined")
            {
                model.emailMsg="Email is mandatory";
                registrationPossible = false;
            }

            console.log(registrationPossible);

             if(user.email == "undefined" ||
             user.email == "undefined" ||
             user.password == "undefined" ||
             user.verifypassword == "undefined"
             ){
             model.message = "All fields are mandatory";
             registrationPossible = false;
             }

            if(user.username != null) {
                ClientUserService.findUserByUserName(user.username)
                    .then(function (userResult) {
                        if (userResult !== null) {
                            registrationPossible = false;
                            model.message = "Username already exists, please choose a different username";
                        }
                    });
            }


            if(registrationPossible == true) {
                //console.log("creation of user possible: " + user.username);
                ClientUserService.createUser(user)
                    .then(function (retuser) {
                        if(retuser != null) {
                            console.log(retuser.user);
                            registerCallback(retuser.user);
                        }
                    });
            }
        }


        function registerCallback(user){
            $rootScope.user = user;
            console.log("user obj from reg contr");
            console.log($rootScope.user);
            ClientUserService.LoginUser(user)
                .then(function(user){
                    $rootScope.user = user;
                    $location.url("/profile");
                });
        }
    }


})();