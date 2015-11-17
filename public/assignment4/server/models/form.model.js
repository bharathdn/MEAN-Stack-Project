module.exports = function(app) {
    var mockForms = require("./form.mock.json");
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

    function Create(form) {
        form.fields = [];
        mockForms.push(form);
        return mockForms;
    }

    function FindAll() {

    }

    function FindById(id) {

    }

    function Update(id) {

    }

    function Delete(formId) {
        for(formIndex in mockForms){
            if(mockForms[formIndex].id == formId){
                mockForms.splice(formIndex,1);
            }
        }
        return mockForms;
    }

    function findFormByTitle(title){

    }

    function FindFormByFormId(){

    }

    function GetAllFieldsByFormId(){

    }

    function FindFormsByUserId(userId)
    {
        var userForms = [];
        for(formIndex in mockForms){
            if(mockForms[formIndex].userId == userId){
                userForms.push(mockForms[formIndex]);
            }
        }
        return userForms;
    }
}