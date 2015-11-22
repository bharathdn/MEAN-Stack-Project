(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($q, $location, $rootScope, FormService){

        var model = this;
        var user = $rootScope.user;
        model.selectedForm = null;


        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
        model.selectForm = selectForm;

        // call function to render forms for Logged In USer
        //console.log("calling render forms");
        if($rootScope.user != null) {
            renderFormsForUser();
        }

        // function to show the forms for logged in User
        function renderFormsForUser(){
            console.log("fetching forms for"+ user.id);
            FormService
                .findAllFormsForUser(user.id)
                .then(function (formsForUser){
                    model.forms = formsForUser;
                    //createFormCallback(formsForUser);
                });
        }


        function addForm(form){
            console.log("addform controller");
            console.log(user.id);
            if(angular.isUndefined(model.form))
            {
                return;
            }
            form.userId = user.id;
            console.log(form);
            FormService.createFormForUser(form)
                .then(function (formResponse){
                    createFormCallback(formResponse);
                    //console.log("ctrller:")
                    //console.log(formResponse);
                    //renderFormsForUser();
                });
        }


        function createFormCallback(forms){
            if(forms != null){
                renderFormsForUser();
            }else{
                console.log("unable to add form");
            }

        }

        function selectForm(selectedForm){
            //console.log(selectedForm);
            model.form = selectedForm;
        }

        function updateForm(form){
            console.log("updating form at controller");
            console.log(form);
            FormService.updateFormById(form)
                .then(function (forms) {
                    //console.log(forms);
                    updateCallback(forms);
                });
        }

        function updateCallback(forms) {
            if(forms != null) {
                console.log("form updated successfully");
                //model.form.title.clear;
                renderFormsForUser();
                //model.forms = forms;
            }
        }

        function deleteForm(form){
            FormService.deleteFormById(form.id)
                .then(function(forms){
                    console.log(forms);
                    formDeleteCallback(forms);
                })
        }

        function formDeleteCallback(forms){
            //console.log(deletedForm);
            renderFormsForUser();
        }
    }
})();
