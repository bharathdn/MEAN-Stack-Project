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

        FormService
            .findAllFormsForUser(user.id)
            .then(function (formsForUser){
                //model.forms = formsForUser;
                createFormCallback(formsForUser);
            });



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

        function deleteForm($index){
            var formToDelete = $scope.forms[$index];
            FormService.deleteFormById(formToDelete.id, formDeleteCallback);
            forms.splice($index,1);
        }

        function formDeleteCallback(deletedForm){
            console.log(deletedForm);
        }
    }

})();
