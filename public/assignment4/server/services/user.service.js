module.exports = function(app, model){

    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUserName);
    app.get("/api/assignment/user?username=alice&password=wonderland",authenticateUser);
    app.put("/api/assignment/user/:id",updateUserById);
    app.delete("/api/assignment/user/:id",removeUserByID);

    function createNewUser(){
        var user = req.body;
        var users =
    }
}