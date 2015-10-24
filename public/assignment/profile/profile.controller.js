(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($scope, $location,UserService){
        $scope.$location = $location;
    }
})();