module.exports = function(app, model){


    app.post("/rest/api/assignment/user", CreateUser);
    app.get("/rest/api/assignment/user", FindAllUsers);
    app.get("/rest/api/assignment/user/:id", FindUserById);
    app.put("/rest/api/assignment/user/:id", UpdateUserById);
    app.delete("/rest/api/assignment/user/:id", RemoveUserByID);


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