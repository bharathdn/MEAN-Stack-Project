module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", GetAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", GetFieldByIds);
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFieldByIds);
    app.post("/api/assignment/form/:formId/field", CreateFieldForFormID);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFieldByIds);


    function GetAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        model.GetAllFieldsByFormId(formId)
            .then(function(result){
                res.json(result);
            });
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
        model.DeleteFieldByIds(formId, fieldId)
            .then(function (fields) {
                res.json(fields);
            });
    }

    function CreateFieldForFormID(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model.CreateFieldForForm(formId,field)
            .then(function(err,result){
                if(err){
                    res.json(null);
                }else{
                    res.json(result);
                }
            });
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