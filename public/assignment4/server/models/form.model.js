var mockForms = require("./form.mock.json");
module.exports = function(app) {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
    }
    return api;

    function Create(Object) {

    }

    function FindAll() {

    }

    function FindById(id) {

    }

    function Update() {

    }

    function Delete() {

    }

    function findFormByTitle(title){

    }
}