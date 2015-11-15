module.exports = function(app, model){

    app.post("/api/assignment/user", createUser);
    /*
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUserName);
    app.get("/api/assignment/user?username=alice&password=wonderland",authenticateUser);
    app.put("/api/assignment/user/:id",updateUserById);
    app.delete("/api/assignment/user/:id",removeUserByID);
    */

    function createUser(req,res){
        var user = req.body;

        //console.log(user);

        var users = model.createNewUser(user);
        //model.createUser(user);
        res.json(users);
    };
};