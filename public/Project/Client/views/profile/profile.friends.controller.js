(function () {
    angular
        .module("BukReviewApp")
        .controller("ProfileFriendsController",ProfileFriendsController);


    /* from Internet
        code for adding and removing friends
     $('.close').click(function(){
     $(this).parents('li').remove();
     })

     */

    function ProfileFriendsController($rootScope,ClientUserService, $location, $window){
        console.log("ProfileFriendsController");
        var model = this;
        model.addFriend                 = addFriend;
        model.renderAllUSers            = renderAllUSers;
        model.renderFriendsFollowers    = renderFriendsFollowers;
        model.removeFriend              = removeFriend;
        model.removeFollower            = removeFollower;
        model.isCurrentUser             = isCurrentUser;
        model.visitFriend               = visitFriend;


        //TODO: implement user search
        var users = [];


        renderAllUSers();
        renderFriendsFollowers();


        function visitFriend(user){
            //console.log(user);
            //$rootScope.visitFriend = user;
            $window.sessionStorage.setItem("visitFriend",angular.toJson(user));
            console.log("you chose to visit "+user.username+"'s profile page");
            $location.url("/publicprofile");
        }


        function isCurrentUser(user){
            if($rootScope.user != null) {
                return $rootScope.user.username == user.username;
            }
        }

        function renderAllUSers() {
            ClientUserService.findAllUsers()
                .then(function (userResponse) {
                    users = userResponse;
                    model.FriendUsers = userResponse;
                });
        }

        function renderFriendsFollowers() {
            // find followers for userID
            ClientUserService.findFriendsAndFollowersForId($rootScope.user._id)
                //TODO : filter current user from USER LIST
                .then(function (friendsObj) {
                    model.Friends = friendsObj.friends;
                    model.Followers = friendsObj.followers;
                });
        }

        function addFriend(friend){
            console.log("PROFILE CONTROLLER : Adding user"+friend._id+" as friend to "+$rootScope.user._id);
            ClientUserService.AddFriendForUserId($rootScope.user._id,friend._id)
                .then(function(userFriendObj){
                    renderFriendsFollowers();
                });
        }

        function removeFriend(friend){
            ClientUserService.removeFriendorFollower($rootScope.user._id, friend._id)
                .then(function(userFriendObj){
                    renderFriendsFollowers();
                });
        }

        function removeFollower(friend){
            ClientUserService.removeFriendorFollower(friend._id, $rootScope.user._id)
                .then(function(userFriendObj){
                    renderFriendsFollowers();
                });
        }

    }

})();