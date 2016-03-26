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
        model.displayUser               = displayUser;


        //TODO: implement user search
        var users = [];


        //renderAllUSers();
        renderFriendsFollowers();

        function displayUser(user){

            if(!user.firstName == null){
                return user.firstName + " " + user.lastName;
            }
            else if(user.firstName == null) {
                return user.username;
            }
            else if(user.username == angular.undefined) {
                return "Anonymous";
            }
        }

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
                .then(function (allUsers) {
                    users = allUsers;
                    model.FriendUsers = filterFriendsFromUSers(allUsers);
                });
        }


        function filterFriendsFromUSers(allUsers){
            var filteredAllUsers = [];
            var friendsUsernamesList = getFriendsUsernamesList(model.Friends);
            if(friendsUsernamesList != null){
                for(var i = 0; i < allUsers.length; i++) {
                    if (friendsUsernamesList.indexOf(allUsers[i].username) == -1){
                        filteredAllUsers.push(allUsers[i]);
                    }
                }
                return filteredAllUsers;
            }
            return allUsers;
        }


        function getFriendsUsernamesList(friends){
            var friendsUsernamesList = [];
            if(friends){
                for(var i = 0; i < friends.length; i++ ){
                    friendsUsernamesList.push(friends[i].username);
                }
                return friendsUsernamesList;
            }
            return null;
        }


        function renderFriendsFollowers() {
            // find followers for userID
            ClientUserService.findFriendsAndFollowersForId($rootScope.user._id)
                //TODO : filter current user from USER LIST
                .then(function (friendsObj) {
                    model.Friends = friendsObj.friends;
                    model.Followers = friendsObj.followers;
                    renderAllUSers();
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