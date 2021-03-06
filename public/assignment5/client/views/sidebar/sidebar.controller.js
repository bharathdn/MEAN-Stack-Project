(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location, $rootScope){
        $scope.$location = $location;
        $scope.setActive = setActive;
        $scope.userLoggedIn = userLoggedIn;

        function setActive(pageName){
            //console.log("setActive function called by "+pageName);
            if($location.url().indexOf(pageName) != -1){
                return 'active';
            }
            else {
                return false;
            }
        }

        function userLoggedIn(){
            if($rootScope.user == null){
                return true;
            }
        }
    }

})();