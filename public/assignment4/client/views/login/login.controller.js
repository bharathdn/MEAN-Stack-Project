(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);


    function LoginController($location,UserService,$rootScope){
        var model = this;
        model.login = login;

        function login(user){
            console.log(user);

            userObj = { "username": user.userName,
                        "password": user.password };

            UserService.findUserByUsernameAndPassword(user)
                .then(function(userResponse){
                    //console.log(userResponse);
                    userLoginCallback(userResponse);
                });
        };

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