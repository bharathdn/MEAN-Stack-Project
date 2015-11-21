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
                .then(function(newUsers) {
                    //console.log(newUsers);
                });
        }

        function updateCallback(user){
            console.log("Updated user");
            console.log(user);
        }

        function showUserinfo(){
            model.user = loggedInUser;
        }
    }
})();