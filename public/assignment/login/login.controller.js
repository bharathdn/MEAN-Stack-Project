(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);


    function LoginController($scope, $location,UserService){
        $scope.$location = $location;
    }
})();