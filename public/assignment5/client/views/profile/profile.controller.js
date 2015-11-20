(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($scope,$location,UserService,$rootScope){
        //$scope.$location = $location;
        //$scope.update = update;
        var model = this;
        model.update = update;

        var loggedInUser = $rootScope.user;
        if(typeof loggedInUser != "undefined") {
            showUserinfo();
        }

        function update(){
            var newuser = {
                userName : model.userName,
                password : model.password,
                email : model.eMail,
                FName: model.fName,
                LName: model.lName
            };

            UserService.updateUser(loggedInUser.id,newuser)
                .then(function(users){
                    //console.log(users);
                    updateCallback(newuser);
                });
        }

        function updateCallback(user){
            //console.log(user);
        }

        function showUserinfo(){
            //console.log("Profile page: registered user info");
            model.user = loggedInUser;
        }
    }
})();