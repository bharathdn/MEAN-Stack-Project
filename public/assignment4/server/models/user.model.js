module.exports = function(){
    var mockUsers = require("./user.mock.json");
    var api = {
        createNewUser: createNewUser,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials
    };
    return api;

    function createNewUser(user){
        mockUsers.push(user);
        return  mockUsers;
    };

    function FindAll(){

    }

    function FindById(id){

    }

    function Update(){

    }
    function Delete(){

    }

    function findUserByUsername(username){

    }

    function findUserByCredentials(credentials){

    }
}
