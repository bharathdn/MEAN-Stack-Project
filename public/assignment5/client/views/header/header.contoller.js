(function(){
	angular
		.module("FormBuilderApp")
		.controller("HeaderController",HeaderController);


	function HeaderController($scope, $location, $rootScope){

        $scope.$location = $location;
        $scope.headerShow = headerShow;
        $scope.isLogin = isLogin;
        $scope.loginShow = loginShow;
        $scope.logoutShow = logoutShow;
        $scope.logoutUser = logoutUser;


        function headerShow(){
            //console.log("headerShow called")
            if($location.url().match( /profile|admin|form|fields/ )){
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
                $scope.username = loggedInUser[0].toUpperCase() + loggedInUser.slice(1);
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
