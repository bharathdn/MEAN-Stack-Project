(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($q, $location, $rootScope, FormService){

        var model = this;
        model.addForm = addForm;
        var user = $rootScope.user;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        //loading alice user for testing purpose
        var user = {id: 711}

        // call function to render forms for Logged In USer
        renderFormsForUser();


        function addForm(form){
            //console.log(form.title);
            if(angular.isUndefined(form))
            {
                return;
            }

            FormService.createFormForUser(user.id,form)
                .then(function (formResponse){
                    console.log(formResponse);
                    createFormCallback(formResponse);
                });
        }

        // function to show the forms for logged in User
        function renderFormsForUser(){
            FormService
                .findAllFormsForUser(user.id)
                .then(function (formsForUser){
                    //model.forms = formsForUser;
                    createFormCallback(formsForUser);
                });
        }

        function createFormCallback(forms){
            //forms.push(form);
            //model.title= "";
            //console.log(form);
            model.forms = forms;
        }

        function selectForm($index){
            var selectedForm = $scope.forms[$index];
            $scope.title = selectedForm.title;
            $scope.selectedForm = $scope.forms[$index];
        }

        function updateForm(){
            var newForm = {
                title: $scope.title
            };
            FormService.updateFormById(
                        $scope.selectedForm.id,
                        newForm,
                        updateCallback);
        }

        function updateCallback(form){
            $scope.selectedForm = form;
            console.log(form);
            $scope.title="";
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
