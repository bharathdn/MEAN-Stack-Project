(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $rootScope, FieldService) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        model.removeField = removeField;
        model.addField = addField;
        //fetch the fields for the user
        GetFieldsForFormId(formId);

        function addField(fieldType) {
            //console.log("add field called with field type "+fieldType)
            var field = {};
            switch(fieldType)
            {
                case "singlelinetext":
                        field.label = "TextField";
                        field.type = "TEXT";
                        field.placeholder = "Text Field";
                        break;
                case
                    "date":

                    break;
                case
                    "dropdown":

                    break;
                case
                    "checkboxes":

                    break;
                case
                    "radiobuttons":

                    break;
                case
                    "paragraphtext":

                    break;
            }

            console.log(field);
            FieldService
                .AddFieldIntoForm(formId,field)
                .then(function(fields){
                    model.fields = fields;
                });
        }

        function GetFieldsForFormId(){
            FieldService
                .FindFieldsForFormId(formId)
                .then(function(fields){
                    console.log(fields);
                    model.fields = fields;
                });
        }

        function removeField(field){
            FieldService
                .DeleteFieldFromForm(field.id,formId)
                .then(function(fields){
                   console.log(fields);
                   //GetFieldsForFormId;
                    model.fields = fields;
                });
        }

        function renderFormsForUser(){
            FormService
                .findAllFormsForUser(user.id)
                .then(function (formsForUser){
                    //model.forms = formsForUser;
                    createFormCallback(formsForUser);
                });
        }


    }
})();