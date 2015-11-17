(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($q, $location, $rootScope, FormService){

        var model = this;

        //var user = $rootScope.user;

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;


        //loading alice user for testing purpose
        var user = {id: 123}
        model.userId = 123;

        // call function to render forms for Logged In USer
        console.log("calling render forms");
        renderFormsForUser();

        // function to show the forms for logged in User
        function renderFormsForUser(){
            FormService
                .findAllFormsForUser(user.id)
                .then(function (formsForUser){
                    model.forms = formsForUser;
                    createFormCallback(formsForUser);
                });
        }


        function addForm(form){
            //console.log(form.title);
            if(angular.isUndefined(model.form))
            {
                return;
            }

            FormService.createFormForUser(user.id,model.form)
                .then(function (formResponse){
                    console.log(formResponse);
                    renderFormsForUser();
                });
        }


        function createFormCallback(forms){
            //forms.push(form);
            //model.title= "";
            //console.log(form);

            //renderFormsForUser();
        }

        function selectForm(selectedForm){
            model.form = selectedForm;
            renderFormsForUser();
        }

        function updateForm(form){
            FormService.updateFormById(form)
                .then(function (forms) {
                    console.log(forms);
                    updateCallback(forms);
                });
        }

        function updateCallback(form){
            //console.log(form);
            renderFormsForUser();
        }

        function deleteForm(form){
            formId = form.id;
            FormService.deleteFormById(formId)
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
