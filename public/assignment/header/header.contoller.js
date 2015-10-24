(function(){
	angular
		.module("FormBuilderApp")
		.controller("HeaderController",HeaderController);


	function HeaderController($scope, $location){
		$scope.$location = $location;
        $scope.headerShow = headerShow;

        function headerShow(){
            if($location.url().match( /profile|admin|form|form-fields/ )){
                return true;
            }

            /*if($location.url().indexOf('profile') != -1){
                return true;
            }*/
            else { return false; }
        }
	}

})();
