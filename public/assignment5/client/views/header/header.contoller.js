(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);


    function HeaderController($location, $rootScope){
        var model = this;
        model.registerShow = registerShow;
        model.isLogin = isLogin;
        model.loginShow = loginShow;
        model.logoutShow = logoutShow;
        model.logoutUser = logoutUser;


        function registerShow(){
            if($rootScope.user != null){
                return true;
            }
            else { return false; }
        }


        function isLogin(){
            if($rootScope.user == null)
            {
                return true;
            }
            else{
                var loggedInUser = $rootScope.user.username;
                model.username = loggedInUser[0].toUpperCase() + loggedInUser.slice(1);
            }
        }

        function loginShow(){
            if($rootScope.user != null){
                return true;
            }
            return false;
        }

        function logoutShow(){
            if($rootScope.user == null){
                return true;
            }
            return false;
        }

        function logoutUser(){
            $rootScope.user = null;
        }
    }

})();