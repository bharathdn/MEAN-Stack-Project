(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService(){

        var forms = [];
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form, callback) {

        }

        function findAllFormsForUser(userId, callback){

        }

        function deleteFormById(formId, callback){

        }

        function updateFormById(formId, newForm, callback){

        }
    }
})();
