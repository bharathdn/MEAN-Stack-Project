"use strict";
(function(){
    angular
        .module("BukReviewApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($location,UserService,$rootScope){
        //$scope.$location = $location;
        //$scope.update = update;
        var model = this;
        model.update = update;

        var loggedInUser = $rootScope.user;
        if(typeof loggedInUser != "undefined") {
            showUserinfo();
        }

        function update(user){
            UserService.updateUser(user)
                .then(function(updateResult) {
                    updateCallback(updateResult,user);
                });
        }

        function updateCallback(updateResult,user){
            //console.log("Updated user");
            //console.log(user);
            if(updateResult.ok == 1) {
                $rootScope.user = user;
                $location.url("/home");
                console.log("user updated successfully");
            }
            else{
                console.log("error in updating user");
                console.log(updateResult);
            }
        }

        function showUserinfo(){
            model.user = loggedInUser;
        }
    }
})();