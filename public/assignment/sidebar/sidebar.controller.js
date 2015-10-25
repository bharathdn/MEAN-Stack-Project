(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location){
        $scope.$location = $location;
        $scope.setActive = setActive;

        function setActive(pageName){
            //console.log("setActive function called by "+pageName);
            if($location.url().indexOf(pageName) != -1){
                return 'active';
            }
            else {
                return false;
            }
        }
    }

})();