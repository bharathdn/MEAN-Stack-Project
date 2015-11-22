(function(){
    angular
        .module("FormBuilderApp")
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
                    updateCallback(user);
                });
        }

        function updateCallback(user){
                $rootScope.user = user;
                $location.url("/home");
                console.log("user updated successfully");

        }

        function showUserinfo(){
            model.user = loggedInUser;
        }
    }
})();