var mockForms = require("./form.mock.json");
module.exports = function(app) {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,

        FindFormsByUserId: FindFormsByUserId,
        FindFormByFormId: FindFormByFormId,

        GetAllFieldsByFormId: GetAllFieldsByFormId,

    }
    return api;

    function Create(Object) {

    }

    function FindAll() {

    }

    function FindById(id) {

    }

    function Update(id) {

    }

    function Delete(id) {

    }

    function findFormByTitle(title){

    }
}