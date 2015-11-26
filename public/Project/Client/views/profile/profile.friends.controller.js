(function () {
    angular
        .module("BukReviewApp")
        .controller("ProfileFriendsController",ProfileFriendsController);


    /*
        code for adding and removing friends
     $('.close').click(function(){
     $(this).parents('li').remove();
     })

     */

    function ProfileFriendsController(ClientUserService){
        console.log("ProfileFriendsController");
        var model = this;
        model.addFriend = addFriend;
        model.unfollowFriend = unfollowFriend;
        model.removeFollower = removeFollower;

        var users = [];
        ClientUserService.findAllUsers()
            .then(function(userResponse){
                console.log(userResponse);
                //userLoginCallback(userResponse);
                users = userResponse;
                model.FriendUsers = userResponse;
                model.Following = users;
                model.Followers = users;
            });

        function addFriend(user){
            console.log("PROFILE FRND CTRL : you chose to add friend "+user.firstName);
        }

        function unfollowFriend(user){
            console.log("PROFILE FRND CTRL : you chose to Unfollow "+user.firstName);
        }

        function removeFollower(user){
            console.log("PROFILE FRND CTRL : you chose to Block you follower "+user.firstName);
        }


    }

})();