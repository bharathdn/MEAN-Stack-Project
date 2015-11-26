(function(){
    angular
        .module("BukReviewApp")//,["ui.bootstrap"]);
        .controller("MainController",MainController);


    function MainController($scope){
        //var model = this;
        $scope.rate = 2;
        $scope.max = 7;
        $scope.isReadonly = true;
        //console.log("Hi from MAin");
    }
})();