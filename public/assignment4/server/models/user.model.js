module.exports = function(){
    var mockUsers = require("./user.mock.json");

    var api = {
        CreateNewUser: CreateNewUser,
        FindAll: FindAll,
        FindById: FindById,
        findUserByUsername:findUserByUsername,
        Update: Update,
        Delete: Delete,
        findUserByCredentials:findUserByCredentials,
        getUserIndex : getUserIndex
    };
    return api;

    function CreateNewUser(user){
        mockUsers.push(user);
        return  mockUsers;
    };

    function FindAll(){

    }

    //sample user json
    var userSample = [{"id": 123, "firstName": "Alice",
        "lastName": "Wonderland",
        "username": "alice",
        "password": "alice"}];


    function findUserByUsername(userName){
        for(user in mockUsers){
            if(userName == user.username){
                return user;
            }
        }
        return null;
    };


    function FindById(id){
        for(user in mockUsers) {
            if (id == user.id) {
                return user;
            }
        }
        return null;
    };


    function Update(){

    }


    function Delete(){

    }


    function findUserByCredentials(credentials){
        var userName = credentials.username;
        var password = credentials.password;

        for(user in mockUsers){
            if(mockUsers[user].username == userName){
                if(mockUsers[user].password == password){
                    //console.log("user "+user.username+" found");
                    return user;
                }
            }
        }
        return null;
    };

    function getUserIndex(userId){
        var userIndex = null;
        for (var index = 0; index < mockUsers.length; index++) {
            if (currentUsers[index].id == userId) {
                userIndex = index;
                return userIndex;
            }
        }
        return userIndex;
    };
}
