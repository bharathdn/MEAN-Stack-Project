module.exports = function(app, model){

    app.post("/api/assignment/user", CreateUser);
    app.get("/api/assignment/user", FindAllUsers);
    app.get("/api/assignment/user/:id", FindUserById);
    app.put("/api/assignment/user/:id", UpdateUserById);
    app.delete("/api/assignment/user/:id", RemoveUserByID);

    function CreateUser(req,res){
        var user = req.body;
        console.lgo("inside server user service");
        var users = model.CreateNewUser(user);
        res.json(users);
    }


    function FindAllUsers(req,res){
        var userName = req.query.username;
        var password = req.query.password;

        if(!((userName == null) && (password == null))){
            var credentials = {
                username: userName,
                password: password
            };

            console.log(credentials);
            var user = model.findUserByCredentials(credentials)
                .then(function (user) {
                    res.json(user);
                });
            return;
        }
        else if(password == null && userName!= null){
            model.findUserByUsername(userName)
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