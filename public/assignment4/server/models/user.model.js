var mockUsers = require("./user.mock.json");
module.exports = function(app){

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials
    }
    return api;

    function Create(Object){

    }

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
