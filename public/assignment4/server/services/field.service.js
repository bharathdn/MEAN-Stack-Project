module.exports = function(app, model) {

    //returns an array of fields belonging to a form object
    // whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field", GetAllFieldsByFormId);

    //returns a field object whose id is equal to the fieldId
    // path parameter and belonging to a form object whose id
    // is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field/:fieldId", GetFieldBYFormIds);

    //removes a field object whose id is equal to the fieldId
    // path parameter and belonging to a form object whose id
    // is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFieldByIds);

    //creates a new field whose properties are the same as the
    // field object embedded in the request's body and the
    // field belongs to a form whose id is equal to the
    // formId path parameter. The field object's id is initially
    // null since it is a new record. The id of the new form field
    // should be set dynamically using Node.js guid or node-uuid
    // libraries.
    app.post("/api/assignment/form/:formId/field", CreateFieldForFormID);

    //updates a field object whose id is equal to the fieldId
    // path parameter and belonging to a form object whose
    // id is equal to the formId path parameter so that
    // its properties are the same as the property values of the
    // field object embedded in the request's body
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFieldByIds);


    function GetAllFieldsByFormId(req,res){
        var formId = req.params.formId;
    }

    function GetFieldBYFormIds(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
    }

    function DeleteFieldByIds(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
    }

    function CreateFieldForFormID(req,res){
        var userId = req.params.userId;
    }

    function UpdateFieldByIds(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
    }
}
