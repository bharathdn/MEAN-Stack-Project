(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);


    function FormController($scope, $location, $rootScope, FormService){
        //$scope.$location = $location;
        var user = $rootScope.user;
        var forms=[];
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.forms = forms;


        function addForm(){
            if($scope.name.length <= 0)
            {
                return;
            }
            var form = {
                name : $scope.name
            };
            FormService.createFormForUser(user.id,form,createFormCallback);
        }

        function createFormCallback(form){
            forms.push(form);
            $scope.name= "";
            console.log(form);
        }

        function selectForm($index){
            var selectedForm = $scope.forms[$index];
            $scope.name = selectedForm.name;
            $scope.selectedForm = $scope.forms[$index];
        }

        function updateForm(){
            var newForm = {
                name: $scope.name
            };
            FormService.updateFormById(
                        $scope.selectedForm.id,
                        newForm,
                        updateCallback);
        }

        function updateCallback(form){
            $scope.selectedForm = form;
            console.log(form);
            $scope.name="";
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
