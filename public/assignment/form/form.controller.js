(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($scope, $location){
        $scope.$location = $location;
    }

})();
