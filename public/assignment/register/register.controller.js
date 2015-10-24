(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);


    function RegisterController($scope, $location,UserService){
        $scope.$location = $location;
    }
})();