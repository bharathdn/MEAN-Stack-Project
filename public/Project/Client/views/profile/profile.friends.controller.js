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
    }

})();