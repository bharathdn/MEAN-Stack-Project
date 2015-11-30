module.exports = function(app, model, mongoose, passport){

    //var breUserSchema = require("../models/schemas/user.schema.js")(mongoose);
    //var breUserModel = mongoose.model("breUserModel",breUserSchema);

    var LocalStrategy = require('passport-local').Strategy;
    app.post("/rest/api/user", CreateUser);
    app.get("/rest/api/user", FindAllUsers);
    app.get("/rest/api/user/:id", FindUserById);
    app.put("/rest/api/user/:id", UpdateUserById);
    app.delete("/rest/api/user/:id", RemoveUserByID);

    // user Friends APIS
    app.post("/rest/api/friend/:userId/:friendId" , AddFriendForUserId);
    app.get("/rest/api/friends/:userId", findFriendsAndFollowersForId);

    app.post("/rest/api/login", passport.authenticate('local'), loginUser);
    app.post("/rest/api/logout", logOutUser);


    function logOutUser(req, res){
        console.log("Logging out");
        req.logOut();
        res.send(200);
    }

    // PASSPORT JS AUTH
    passport.use(new LocalStrategy(
        function(username, password, done)
        {
            var credentials = {username: username, password: password};
            model
                .findUserByCredentials(credentials)
                .then(function(user){
                    if(!user){
                        return done(null, false);
                    }
                    return done(null, user);
                }, function(err){
                    return done(err);
                });
        }
    ));

    function loginUser(req,res){
        var user = req.user;
        //console.log("USER SERVICE: Login USER -> ");
        //console.log(user);
        res.json(user);
    }

    passport.serializeUser(function(user,done){
        done(null, user);
    });

    passport.deserializeUser(function(user,done){
        model
            .FindById(user._id)
            //.then(function(err,user){
            .then(function(user){
                //done(err,user)
                console.log("deserializer");
                console.log(user);
                done(null, user);
            }, function(err){
                done(err);
            });
    });

    var auth = function (req, res, next) {
        if(!req.isAuthenticated())
        {
            res.send(401);
        }else{
            next();
        }
    };

    /*function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else{
            //TODO
        }
        // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
    }*/


    function findFriendsAndFollowersForId(req,res){
        model.findFriendsAndFollowersForId(req.params.userId)
            .then(function(userFriendFollowerObj){
                console.log(userFriendFollowerObj);
                res.json(userFriendFollowerObj);
            });

        //var users = model.findFriendsAndFollowersForId(req.params.userId);
        /*console.log("SERVER USER SERVICE:");
        console.log(users);*/
    }


    function AddFriendForUserId(req,res){
        var userId = req.params.userId;
        var friendId = req.params.friendId;

        console.log("SERVER USER SERVICE: Adding user"+friendId+" as friend to "+userId);
        model.AddFriendForUserId(userId,friendId)
            .then(function (userFriendObj) {
                res.json(userFriendObj);
            });
    }

    function CreateUser(req,res){
        var user = req.body;
        model.CreateNewUser(user)
            .then(function (userReturned) {
                /*console.log("added user obj");
                console.log(userReturned);*/
                res.json(userReturned);
            });
    }

    function FindAllUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;
        //console.log(username);
        //console.log(password);

        var count = 0;
        if(username!= null && password!=null){

            var credentials = {
                username: username,
                password: password
            };

            //console.log(credentials);
            var user = model.findUserByCredentials(credentials)
                .then(function (userReturned) {
                    //console.log("added user obj");
                    //console.log(userReturned);
                    res.json(userReturned);
                });
            return;
        }
        else if(password == null  && username != null){
            //console.log("finding user only");
            //console.log(username);
            model.findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                });
            return;
        }

        var users = model.FindAll()
            .then(function (users) {
                res.json(users);
            });
    }


    function FindUserById(req,res){
        var userId = req.params.id;
        model.FindById(userId)
            .then(function (user) {
                //console.log(user);
                res.json(user);
            });
    }


    function UpdateUserById(req, res){
        var user = req.body;
        var userId = req.params.id;
        console.log("updating user on Server Userservice");
        console.log(user);
        model.Update(userId, user)
            .then(function (user) {
                //console.log(user);
                res.json(user);
            });
    }


    function RemoveUserByID(req, res){
        var userId = req.params.id;
        model.Delete(userId)
            .then(function (user) {
                //console.log(user);
                res.json(user);
            });
    }

};