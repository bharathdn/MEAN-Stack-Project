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

    function ProfileFriendsController($rootScope,ClientUserService){
        console.log("ProfileFriendsController");
        var model = this;
        model.addFriend                 = addFriend;
        //model.unfollowFriend            = unfollowFriend;
        //model.removeFollower            = removeFollower;
        model.renderAllUSers            = renderAllUSers;
        model.renderFriendsFollowers    = renderFriendsFollowers;
        model.removeFriend              = removeFriend;
        model.removeFollower            = removeFollower;
        var users = [];


        renderAllUSers();
        renderFriendsFollowers();

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
                .then(function (friendsObj) {
                    model.Friends = friendsObj.friends;
                    model.Followers = friendsObj.followers;
                });
        }

        function addFriend(friend){
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