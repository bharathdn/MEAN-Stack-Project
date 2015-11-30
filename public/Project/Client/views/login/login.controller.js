(function(){
    angular
        .module("BukReviewApp")
        .controller("LoginController",LoginController);


    function LoginController($location,ClientUserService,$rootScope){
        var model = this;
        model.login         =   login;
        model.loginPass     =   loginPass;

        console.log("Login ctrlr");

        function login(user){
            ClientUserService.findUserByUsernameAndPassword(user)
                .then(function(userResponse){
                    //console.log(userResponse);
                    userLoginCallback(userResponse);
                });
        }

        // passport JS login
        function loginPass(user){
            ClientUserService.LoginUser(user)
                .then(function(userResponse){
                    //console.log(userResponse);
                    userLoginCallback(userResponse);
                });
        }


        function userLoginCallback(user){
            console.log("returned users");
            console.log(user);
            if(user != null){
                $rootScope.user = user;
                console.log("user found, login sucessful");
                $location.url("/home");
            }
            else
            {
                console.log("user not found, login failed");
            }
        }
    }
})();