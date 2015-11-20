module.exports = function(app, model){

    app.post("/api/assignment/user", CreateUser);
    app.get("/api/assignment/user", FindAllUsers);
    app.get("/api/assignment/user/:id", FindUserById);
    //app.get("/api/assignment/user?username=username", FindUserByUserName);
    //app.get("/api/assignment/userauth/:username/:password", AuthenticateUser);
    //app.get("/api/assignment/user?username=username&password=password", AuthenticateUser);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.delete("/api/assignment/user/:id", RemoveUserByID);

    function CreateUser(req,res){
        var user = req.body;
        //console.log("Server UserService : creating user "+user);
        var users = model.CreateNewUser(user);
        res.json(users);
    }

    function FindAllUsers(req,res){
        var userName = req.query.username;
        var password = req.query.password;

        if(!((userName == null) && (password == null))){
            var credentials = {
                username: userName, //req.params.username,
                password: password //req.params.password
            };

            var user = model.findUserByCredentials(credentials);
            res.json(user);
        }
        else if(password == null){
            console.log("searching for userName "+userName);
            var user = model.findUserByUsername(userName);
            res.json(user);
        }

        var users = model.FindAll();
        res.json(users);
    }

    function AuthenticateUser(userName,password){//req,res){
        //var credentials = req.body;

    }

    function FindUserById(req,res){
        var userId = req.params.id;
        console.log("searching for userID "+userId);
        var user = model.FindById(userId);
        res.json(user);
    }


    function FindUserByUserName(userName){
        //var userName = req.params.username;

    }


    function UpdateUserById(req, res){
        var userId = req.params.id;
        var user = req.body;
        var users = model.Update(userId,user);
        res.json(users);
    }1


    function RemoveUserByID(req, res){
        var userId = req.params.id;
        var user = req.body;
        var users = model.Delete(userId,user);
        res.json(users);
    }
};