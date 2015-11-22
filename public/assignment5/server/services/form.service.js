module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", GetFormsByUserId);
    app.get("/api/assignment/form/:formId", GetFormContentsByFormId);
    app.delete("/api/assignment/form/:formId", DeleteFormByFormById);
    app.post("/api/assignment/user/:userId/form", CreateFormForUser);
    app.put("/api/assignment/form/:formId", UpdateFormByFormId);

    function GetFormsByUserId(req,res){
        var userId = req.params.userId;
        console.log(userId);
        //var forms = model.FindFormsByUserId(userId);
        model.FindFormsByUserId(userId)
            .then(function (userForms) {
                //console.log(userForms);
                res.json(userForms);
            })
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

        form.userId = userId;
        model.Create(form)
            .then(function (createdForm) {
                //console.log("result of form creation")
                //console.log(createdForm);
                res.json(createdForm);
            });
        //var userforms = model.FindFormsByUserId(userId);
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