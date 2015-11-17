(function() {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        //var forms = [];
        var service = {
            //createFormForUser: createFormForUser,
            //findAllFormsForUser: findAllFormsForUser,
            //deleteFormById: deleteFormById,
            //updateFormById: updateFormById,
            FindFieldsForFormId: FindFieldsForFormId
        };
        return service;

        function FindFieldsForFormId(formId){
            var deffered = $q.defer();

            $http.get("/api/assignment/form/:formId/field")
                .success(function(fields){
                    deffered.resolve(fields);
                });
            return deffered.promise;
        }
    }

})();