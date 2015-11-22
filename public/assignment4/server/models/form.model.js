module.exports = function(db, mongoose) {
    var mockForms = require("./form.mock.json");
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,

        FindFormsByUserId: FindFormsByUserId,
        FindFormIndexByFormId: FindFormIndexByFormId,

        GetAllFieldsByFormId: GetAllFieldsByFormId,
        DeleteFieldByIds: DeleteFieldByIds,
        CreateFieldForForm: CreateFieldForForm
    }
    return api;

    function Create(form) {
        form.fields = [];
        console.log("adding form");
        console.log(form);
        mockForms.push(form);
        return mockForms;
    }

    function CreateFieldForForm(formId,field){
        for(formIndex in mockForms){
            if(mockForms[formIndex].id == formId){
                mockForms[formIndex].fields.push(field);
                return mockForms[formIndex].fields;
            }
        }
    }

    function FindAll() {

    }

    function FindById(id) {

    }

    function Update(id,form) {
        var formIndex = FindFormIndexByFormId(id);
        mockForms.splice(formIndex,1);
        mockForms.push(form);
        return mockForms;
    }

    function DeleteFieldByIds(formId,fieldId){
        for(formIndex in mockForms){

            if(mockForms[formIndex].id == formId)
            {
                formFields = mockForms[formIndex].fields;

                for(fieldIndex in formFields){

                    if(formFields[fieldIndex].id == fieldId){
                        mockForms[formIndex].fields.splice(fieldIndex,1);
                        //return mockForms;
                        return mockForms[formIndex].fields;
                    }
                }
            }
        }
        return null;
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

    function GetAllFieldsByFormId(formId){
        for(formIndex in mockForms){
            if(mockForms[formIndex].id == formId){
                return mockForms[formIndex].fields;
            }
        }
    }

    function FindFormIndexByFormId(formId)
    {
        for(formIndex in mockForms){
            if(mockForms[formIndex].id == formId){
                return formIndex;
            }
        }
        return null;
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