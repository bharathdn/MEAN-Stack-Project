module.exports = function(app, model) {

    app.get("/hw4/api/assignment/form/:formId/field", GetAllFieldsByFormId);
    app.get("/hw4/api/assignment/form/:formId/field/:fieldId", GetFieldByIds);
    app.delete("/hw4/api/assignment/form/:formId/field/:fieldId", DeleteFieldByIds);
    app.post("/hw4/api/assignment/form/:formId/field", CreateFieldForFormID);
    app.put("/hw4/api/assignment/form/:formId/field/:fieldId", UpdateFieldByIds);


    function GetAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        //console.log("feild Service, fecting fields for:"+formId);
        var fields = model.GetAllFieldsByFormId(formId);
        res.json(fields);
    }

    function GetFieldByIds(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.GetFieldByIds(formId, fieldId);
        res.json(field);
    }

    function DeleteFieldByIds(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.DeleteFieldByIds(formId, fieldId);
        res.json(fields);
    }

    function CreateFieldForFormID(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field.id = createGuid();
        var fields = model.CreateFieldForForm(formId,field);
        res.json(fields);
    }

    function UpdateFieldByIds(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
    }

    function createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}