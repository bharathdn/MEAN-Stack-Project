module.exports = function(app, model) {

    //returns an array of forms belonging to a user whose id is equal
    // to the userId path parameter
    app.get("/api/assignment/user/:userId/form", GetFormsByUserId);

    //returns a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId", GetFormContentsByFormId);

    //removes a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId", DeleteFormByFormById);

    //creates a new form whose properties are the same as the
    // form object embedded in the HTTP request's body and the
    // form belongs to a user whose id is equal to the userId path parameter.
    // The form object's id is initially null since it is a new record.
    // The id of the new form should be set dynamically using Node.js guid
    // or node-uuid libraries.
    app.post("/api/assignment/user/:userId/form", CreateFormForUser);

    //updates a form object whose id is equal to the formId path
    // parameter so that its properties are the same as the property
    // values of the form object embedded in the request's body
    app.put("/api/assignment/form/:formId", UpdateFormByFormId);


    function GetFormsByUserId(req,res){
        var userId = req.params.userId;
    }

    function GetFormContentsById(req,res){
        var formId = req.params.formId;
    }

    function DeleteFormByFormById(req,res){
        var formId = req.params.formId;
    }

    function CreateFormForUser(req,res){
        var userId = req.params.userId;
    }

    function UpdateFormByFormId(req,res){
        var formId = req.params.formId;
    }
}
