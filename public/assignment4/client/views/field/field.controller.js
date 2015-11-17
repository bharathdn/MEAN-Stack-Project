(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $rootScope, FieldService) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;


        //fetch the fields for the user
        GetFieldsForFormId(formId);

        function GetFieldsForFormId(){
            FieldService
                .FindFieldsForFormId(formId)
                .then(function(fields){
                    console.log(fields);
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