(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController($scope, $location,UserService,$rootScope){
        //$scope.$location = $location;
        var user = $rootScope.user;
        showUserinfo();

        $scope.update = update;
        //$scope.updateCallback = updateCallback;

        function update(){
            var newuser = {
                userName : $scope.userName,
                password : $scope.password,
                //id: user.id,
                email : $scope.email,
                FName: $scope.fName,
                LName: $scope.lName
            };
            //console.log(newuser);

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