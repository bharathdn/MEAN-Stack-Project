module.exports = function(app, model){

    app.post("/api/assignment/user", CreateUser);
    app.get("/api/assignment/user", FindAllUsers);
    app.get("/api/assignment/user/:id", FindUserById);
    app.get("/api/assignment/user?username=username", FindUserByUserName);
    app.get("/api/assignment/userauth/:username/:password", AuthenticateUser);
    //app.get("/api/assignment/user?username=username&password=password", AuthenticateUser);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.delete("/api/assignment/user/:id", RemoveUserByID);

    function CreateUser(req,res){
        var user = req.body;
        //console.log("creating user "+user);
        var users = model.CreateNewUser(user);
        res.json(users);
    };


    function AuthenticateUser(req,res){
        var credentials = req.body;
        var credentials = {
            username: req.params.username,
            password: req.params.password
        };

        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }


    function FindAllUsers(req,res){
        var users = model.FindAll();
        res.json(users);
    }


    function FindUserById(req,res){
        var userId = req.params.id;
        console.log("searching for userID "+userId);
        var user = model.FindById(userId);
        res.json(user);
    }


    function FindUserByUserName(req,res){
        var userName = req.params.username;
        console.log("searching for userName "+userName);
        var user = model.findUserByUsername(userName);
        res.json(user);
    }


    function UpdateUserById(req, res){
        var userId = req.params.id;
        var user = req.body;
        var users = model.Update(userId,user);
        res.json(users);
    }


    function RemoveUserByID(req, res){
        var userId = req.params.id;
        var user = req.body;
        var users = model.Delete(userId,user);
        res.json(users);
    }
};