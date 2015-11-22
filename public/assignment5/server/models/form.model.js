module.exports = function(db, mongoose){
    var q  = require("q");
    var mockForms = require("./form.mock.json");

    var formSchema = require("./form.schema.js")(mongoose);
    var formModel = mongoose.model("formModel",formSchema);

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
        DeleteFieldByIds: DeleteFieldByIds,
        CreateFieldForForm: CreateFieldForForm
    }
    return api;

    function Create(form) {
        var deferred = q.defer();

        formModel.create(form,
            function(err,result){
                if(err){
                    deferred.reject(null);
                }
                else{
                    //console.log("result of form creation")
                    //console.log(result);
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
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

    function FindFormsByUserId(userId)
    {
        var deferred = q.defer();

        formModel.find({userId: userId},
            function(err,result){
               if(err){
                   deferred.reject(null);
               }
                else{
                   //console.log("forms fecthed for user");
                   //console.log(result);
                   deferred.resolve(result);
               }
            });
        return deferred.promise;
    }

}