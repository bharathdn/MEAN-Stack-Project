"use strict";
(function(){
    angular
        .module("BukReviewApp")
        .controller("ProfilePublicController",ProfilePublicController);


    function ProfilePublicController($location,ClientUserService,$rootScope){
        //$scope.$location = $location;
        //$scope.update = update;
        var model = this;

        model.user = $rootScope.user;
    }
})();