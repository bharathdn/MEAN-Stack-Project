module.exports = function(app, model) {

    app.get("/hw4/api/assignment/user/:userId/form", GetFormsByUserId);
    app.get("/hw4/api/assignment/form/:formId", GetFormContentsByFormId);
    app.delete("/hw4/api/assignment/form/:formId", DeleteFormByFormById);
    app.post("/hw4/api/assignment/user/:userId/form", CreateFormForUser);
    app.put("/hw4/api/assignment/form/:formId", UpdateFormByFormId);


    function GetFormsByUserId(req,res){
        var userId = req.params.userId;
        var forms = model.FindFormsByUserId(userId);
        res.json(forms);
    }

    function GetFormContentsByFormId(req,res){
        var formId = req.params.formId;
        var form = model.FindFormByFormId(formID)
        res.json(form);
    }

    function DeleteFormByFormById(req,res){
        var formId = req.params.formId;
        var forms = model.Delete(formId);
        res.json(forms);
    }

    function CreateFormForUser(req,res){
        var userId = req.params.userId;
        var form = req.body;

        form.id = createGuid();
        form.userId = userId;

        var forms = model.Create(form);
        //var userforms = model.FindFormsByUserId(userId);
        res.json(forms);
    }


    function UpdateFormByFormId(req,res){
        var formId = req.params.formId;
        var updatedForm = req.body;

        var forms = model.Update(formId,form);
        res.json(forms);
    }

    function createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}
