module.exports = function(app, model){

    app.post("/hw4/api/assignment/user", CreateUser);
    app.get("/hw4/api/assignment/user", FindAllUsers);
    app.get("/hw4/api/assignment/user/:id", FindUserById);
    app.put("/hw4/api/assignment/user/:id", UpdateUserById);
    app.delete("/hw4/api/assignment/user/:id", RemoveUserByID);

    function CreateUser(req,res){
        var user = req.body;
        var users = model.CreateNewUser(user);
        res.json(users);
    }

    function FindAllUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);


        if(username!= null && password!=null){

            var credentials = {
                username: username,
                password: password
            };

            //console.log(credentials);
            var user = model.findUserByCredentials(credentials);
            res.json(user);
            return;
        }
        else if(password == null  && username != null){
            var user = model.findUserByUsername(username);
            res.json(user);
            return;
        }

        var users = model.FindAll();
        res.json(users);
    }


    function FindUserById(req,res){
        var userId = req.params.id;
        var user = model.FindById(userId);
        res.json(user);
    }


    function UpdateUserById(req, res){
        var user = req.body;
        var userId = req.params.id;
        var user = model.Update(userId, user);
        console.log(user);
        res.json(user);
    }


    function RemoveUserByID(req, res){
        var userId = req.params.id;
        var user = model.Delete(userId);
        res.json(user);
    }

};