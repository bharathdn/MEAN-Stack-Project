(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($scope, $location,UserService,$rootScope){
        //$scope.$location = $location;
        var user = $rootScope.user;
        if(typeof user != "undefined") {
            showUserinfo();
        }

        $scope.update = update;

        function update(){
            var newuser = {
                userName : $scope.userName,
                password : $scope.password,
                email : $scope.email,
                FName: $scope.fName,
                LName: $scope.lName
            };

            UserService.updateUser(user.id,newuser,updateCallback);
        }

        function updateCallback(user){
            console.log(user);
        }

        function showUserinfo(){
            $scope.userName = user.userName,
            $scope.password = user.password,
            $scope.fName = user.userFname,
            $scope.lName = user.userLname,
            $scope.eMail = user.userEmail
        }
    }
})();